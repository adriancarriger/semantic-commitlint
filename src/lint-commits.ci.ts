// @ts-nocheck
import * as getConfig from 'semantic-release/lib/get-config';
import * as getCommits from 'semantic-release/lib/get-commits';
import * as logger from 'semantic-release/lib/logger';

import { validateCommits } from './lint-commits.plugin';
import { getSemanticCommitlintConfig } from './util';

export default async function runCommitLint(opts?) {
  console.log('semantic-commitlint: CI');
  const semanticCommitlintConfig = await getSemanticCommitlintConfig();
  const commitsToSkip = semanticCommitlintConfig.skipCommits || [];

  const { plugins, options } = await getConfig(opts, logger);

  const { commits, lastRelease } = await getCommits(
    await plugins.getLastRelease({ options, logger }),
    options.branch,
    logger
  );

  await validateCommits(filterCommits(commits, commitsToSkip));
};

function filterCommits(commits, skips) {
  return commits.filter(commitData => !skips.includes(commitData.commit.short));
}

runCommitLint().catch(error => {
  console.error(error);
  process.exit(1);
});
