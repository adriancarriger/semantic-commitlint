#!/usr/bin/env node

import * as program from 'commander';
declare function require(name: string);

program
  .option('-c, --ci', 'Run in CI')
  .option('-h, --hook', 'Run on commit hook')
  .parse(process.argv);

const location = program.ci ? 'ci' : 'local';
process.env.COMMIT_HOOK = program.hook;

const runCommitLint = require(`./lint-commits.${location}`).default;

runCommitLint().catch(error => {
  console.error(error);
  process.exit(1);
});
