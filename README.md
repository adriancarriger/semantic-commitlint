# Semantic Commitlint [![npm version](https://badge.fury.io/js/semantic-commitlint.svg)](https://badge.fury.io/js/semantic-commitlint)

📦🚀 + 📓 A continuous integration build tool to ensure all new commits meet your commit message format!
️️

[![Build Status](https://img.shields.io/circleci/project/github/adriancarriger/semantic-commitlint/master.svg?maxAge=60)](https://circleci.com/gh/adriancarriger/semantic-commitlint)
[![Dependency Status](https://img.shields.io/david/adriancarriger/semantic-commitlint/master.svg?maxAge=60)](https://david-dm.org/adriancarriger/semantic-commitlint)
[![devDependency Status](https://img.shields.io/david/dev/adriancarriger/semantic-commitlint/master.svg?maxAge=60)](https://david-dm.org/adriancarriger/semantic-commitlint?type=dev)

## Problem

* [📦🚀 semantic-release](https://github.com/semantic-release/semantic-release) depends on properly formatted commit messages
* [📓 commitlint](https://github.com/marionebl/commitlint) is awesome, but it doesn't know which commits occurred since your last release

## Solution

* [semantic-commitlint](https://github.com/adriancarriger/semantic-commitlint) fills the gap between semantic-release and commitlint by asking commitlint to lint new commit messages that have not been included in a previous release

## Features

* Run in CI on all branches to ensure that only builds with valid commit messages pass
* Wraps [semantic-release](https://github.com/semantic-release/semantic-release) and [commitlint](https://github.com/marionebl/commitlint) for an easy install
* Minimal config

## Install

```bash
npm install semantic-commitlint --save-dev
```

## Setup

Add the following to your `package.json`

```json
{
  "scripts": {
    "semantic-commitlint": "semantic-commitlint",
    "semantic-release": "semantic-release"
  },
  "release": {
    "verifyRelease": ["semantic-commitlint"]
  }
}
```

Setup [semantic-release authentication](https://github.com/semantic-release/semantic-release/blob/caribou/docs/usage/ci-configuration.md#ci-configuration) for CI

## Usage

Add the following commands to your CI build process

```bash
npm run semantic-commitlint -- --ci
npm run semantic-release
```

## Local usage

To get early feedback on commit messages you can add the following to a commit hook or your regular set of tests.

```bash
npm run semantic-commitlint
```

This allows your project's contributors to get early feedback on their last commit message instead of waiting for CI to fail a build.

* **Last commit only** - this will not validate all new commit messages because Github auth is required to gather commits that have been added since the last release.

## Config

### Skip commits

If there are unreleased commits that shouldn't fail a build, then add them to your `package.json` inside the `semanticCommitlint` config.

```json
{
  "semanticCommitlint": {
    "skipCommits": ["a1be371"]
  }
}
```

### Custom lint functions

To add a custom lint function add your function's path in `package.json`.

```json
{
  "semanticCommitlint": {
    "lintFunctions": ["./my-function.js"]
  }
}
```

The function itself works like this:

```js
// my-function.js
function customValidation(commitMessage, report) {
  if (commitMessage.includes('something bad')) {
    report.valid = false;
    report.errors.push({
      level: 2,
      valid: false,
      name: 'type-bad',
      message: 'Commit message should have been better!'
    });
  }
}

module.exports = customValidation;
```

## External config

This project just ties together some functionality from two external projects. For all other config options make sure to read through the docs.

* [📦🚀 semantic-release](https://github.com/semantic-release/semantic-release)
* [📓 commitlint](https://github.com/marionebl/commitlint)

## Commit hooks

You can prevent invalid commit messages from every being created by using [Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)!

* Add [husky](https://github.com/typicode/husky)

```bash
npm install --save-dev husky@next
```

* Update `package.json`

```json
{
  "husky": {
    "hooks": {
      "prepare-commit-msg": "npm run semantic-commitlint -- -h"
    }
  }
}
```

## Issues

Not all features implemented in semantic-release and commitlint are currently available when using semantic-commtlint. If you have a suggestion, please [open an issue](https://github.com/adriancarriger/semantic-commitlint/issues/new). Thanks!

## License

semantic-commitlint is licensed under the MIT Open Source license.
For more information, see the [LICENSE](LICENSE) file in this repository.
