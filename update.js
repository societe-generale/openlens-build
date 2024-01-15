const fs = require('fs');

const packageJson = JSON.parse(fs.readFileSync('./lens/open-lens/package.json'));

delete packageJson.scripts.postinstall;

packageJson.version = `${packageJson.version}-${process.env.BUILD_ID}`;
console.log(`Set build version: ${packageJson.version}`)

packageJson.build.npmRebuild = true;

packageJson.build.publish = [{
    url: `https://github.com/societe-generale/OpenLens/releases/download/${packageJson.version}`,
    provider: 'generic'
}];

packageJson.copyright += '\n\n' 
    + 'Binary application builds @ societe-generale/openlens-build\n',
    + 'by Societe Generale';

fs.writeFileSync('./lens/open-lens/package.json', JSON.stringify(packageJson, null, 2));
