const fs = require('fs');

const packageJsonOpenLens = require('./lens/open-lens/package.json');

packageJsonOpenLens.build.publish = [{
    url: "https://github.com/societe-generale/OpenLens/releases/download/Latest",
    provider: "generic"
}];

packageJsonOpenLens.version = `${packageJsonOpenLens.version}-${process.env.BUILD_ID}`;
packageJsonOpenLens.build.npmRebuild = true;
packageJsonOpenLens.build.detectUpdateChannel = false;
packageJsonOpenLens.build.beforeBuild = '../../build-hooks/beforeBuild';

delete packageJsonOpenLens.scripts.postinstall;

packageJsonOpenLens.copyright = [
    packageJsonOpenLens.copyright,
    '',
    'Binary application builds @ societe-generale/openlens-build',
    'by Societe Generale'
].join("\r\n")

console.log(`Set build version: ${packageJsonOpenLens.version}`)

fs.writeFileSync('./lens/open-lens/package.json', JSON.stringify(packageJsonOpenLens, null, 2));
