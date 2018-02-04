import { execSync } from 'child_process';

import { validateCommits } from './lint-commits.plugin';

const commits = [{
  commit: {},
  message: lastCommitMessage()
}];

export default function runLocal() {
  console.log('semantic-commitlint: local');
  return validateCommits(commits);
}

function lastCommitMessage() {
  if (process.env.COMMIT_HOOK === 'true') {
    return require('fs').readFileSync('.git/COMMIT_EDITMSG', 'utf8');
  } else {
    return execSync('git log -1 --pretty=%B').toString();
  }
}
