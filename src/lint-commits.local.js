const { execSync } = require('child_process');

const verifyCommits = require('./lint-commits.plugin');

const commits = [{
  message: lastCommitMessage(),
  commit: {}
}];

function runLocal() {
  console.log('semantic-commitlint: local');
  return verifyCommits({}, {commits});
}

function lastCommitMessage() {
  if (process.env.COMMIT_HOOK) {
    return require('fs').readFileSync('.git/COMMIT_EDITMSG', 'utf8');
  } else {
    return execSync('git log -1 --pretty=%B').toString();
  }
}

module.exports = runLocal;
