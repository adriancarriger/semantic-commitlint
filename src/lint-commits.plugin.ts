import { format, load, lint } from '@commitlint/core';
import * as SemanticReleaseError from '@semantic-release/error';
import * as config from '@commitlint/config-conventional';
import * as path from 'path';

import { getSemanticCommitlintConfig } from './util';

export function verifyRelease(repoData, data): Promise<void> {
  return validateCommits(data.commits);
}

export async function validateCommits(commits) {
  const opts = await load(config);
  const semanticCommitlintConfig = await getSemanticCommitlintConfig();
  const customLintFunctions = getCustomLintFunctions(semanticCommitlintConfig);
  await Promise.all(commits.map((commit) => validateCommit(commit, opts, customLintFunctions)));
}

async function validateCommit(commitMeta, opts, customLintFunctions) {
  const report = await lint(`${commitMeta.message}`, opts.rules, opts.parserPreset ? {parserOpts: opts.parserPreset.parserOpts} : {});
  customLintFunctions.forEach(customLintFunction => customLintFunction(commitMeta.message, report));
  if (!report.valid) {
    const detail = commitMeta.commit.short ? ` ${commitMeta.commit.short}` : '';
    console.error('😞   Errors found with commit' + detail);
    console.error(`💬   ${commitMeta.message}`);
    const formated = format({errors: report.errors});
    formated.forEach(item => console.log(item));
    throw new SemanticReleaseError(
      `The commit message is not formatted correctly`,
      'EINVALIDCOMMIT'
    );
  }
}

function getCustomLintFunctions({ lintFunctions }) {
  if (lintFunctions === undefined) { return []; }
  return lintFunctions.map(requireRelative);
}

function requireRelative(relativePath) {
  return require(path.resolve(relativePath));
}
