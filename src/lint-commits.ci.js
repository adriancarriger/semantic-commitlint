// @ts-nocheck
const getConfig = require('semantic-release/lib/get-config');
const getCommits = require('semantic-release/lib/get-commits');
const logger = require('semantic-release/lib/logger');

const verifyCommits = require('./lint-commits.plugin');
const { getSemanticCommitlintConfig } = require('./util');

async function runCommitLint(opts) {
  console.log('semantic-commitlint: CI');
  const semanticCommitlintConfig = await getSemanticCommitlintConfig();
  const commitsToSkip = semanticCommitlintConfig.skipCommits || [];

  const { plugins, options } = await getConfig(opts, logger);

  const { commits, lastRelease } = await getCommits(
    await plugins.getLastRelease({ options, logger }),
    options.branch,
    logger
  );

  await verifyCommits({}, {
    commits: filterCommits(commits, commitsToSkip)
  });
};

function filterCommits(commits, skips) {
  return commits.filter(commitData => !skips.includes(commitData.commit.short));
}

runCommitLint().catch(error => {
  console.error(error);
  process.exit(1);
});

module.exports = runCommitLint
