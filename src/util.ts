import * as readPkgUp from 'read-pkg-up';

export async function getSemanticCommitlintConfig() {
  const { pkg } = await readPkgUp();
  return pkg && pkg.semanticCommitlint ? pkg.semanticCommitlint : {};
}
