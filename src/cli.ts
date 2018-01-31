#!/usr/bin/env node

import * as program from 'commander';
declare function require(name: string);

program
  .option('-c, --ci', 'Run in CI')
  .parse(process.argv);

const location = program.ci ? 'ci' : 'local';
const runCommitLint = require(`./lint-commits.${location}`).default;

runCommitLint().catch(error => {
  console.error(error);
  process.exit(1);
});
