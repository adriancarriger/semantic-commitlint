const readPkgUp = require('read-pkg-up');

async function getSemanticCommitlintConfig() {
  const { pkg } = await readPkgUp();
  return pkg && pkg.semanticCommitlint ? pkg.semanticCommitlint : {};
}

module.exports = { getSemanticCommitlintConfig };
