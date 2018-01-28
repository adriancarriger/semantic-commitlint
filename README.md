# Semantic Commitlint [![npm version](https://badge.fury.io/js/semantic-commitlint.svg)](https://badge.fury.io/js/semantic-commitlint)

📦🚀📓 [semantic-release](https://github.com/semantic-release/semantic-release) + [commitlint](https://github.com/marionebl/commitlint) => Only release builds with good commits!
️️

[![Build Status](https://img.shields.io/circleci/project/github/adriancarriger/semantic-commitlint/master.svg?maxAge=60)](https://circleci.com/gh/adriancarriger/semantic-commitlint)
[![Dependency Status](https://img.shields.io/david/adriancarriger/semantic-commitlint/master.svg?maxAge=60)](https://david-dm.org/adriancarriger/semantic-commitlint)
[![devDependency Status](https://img.shields.io/david/dev/adriancarriger/semantic-commitlint/master.svg?maxAge=60)](https://david-dm.org/adriancarriger/semantic-commitlint?type=dev)

## Install

```bash
npm install semantic-commitlint --save-dev
```

## Setup

Add the following to your `package.json`

```json
{
  "release": {
    "verifyRelease": [
      "semantic-commitlint"
    ]
  }
}
```

## Config

If there are unreleased commits that shouldn't fail a build, then add them to your `package.json` inside the `semanticCommitlint` config.

```json
{
  "semanticCommitlint": {
    "skipCommits": ["a1be371"]
  }
}
```
