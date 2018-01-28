#!/usr/bin/env node

const program = require('commander');

program
  .option('-c, --ci', 'Run in CI')
  .parse(process.argv);

const location = program.ci ? 'ci' : 'local';
const runCommitLint = require(`./lint-commits.${location}`);

runCommitLint().catch(error => {
  console.error(error);
  process.exit(1);
});
