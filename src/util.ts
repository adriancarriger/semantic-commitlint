import * as readPkgUp from 'read-pkg-up';

export async function getSemanticCommitlintConfig() {
  const { package: closestPackage } = await readPkgUp();
  return closestPackage && closestPackage.semanticCommitlint
    ? closestPackage.semanticCommitlint
    : {};
}
