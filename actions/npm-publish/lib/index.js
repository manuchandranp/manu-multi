const core = require('@actions/core');
const { execSync } = require('child_process');

async function run() {
  try {
    const jfrogNpmRepository = core.getInput('jfrog-npm-repository');
    const jfrogUrl = core.getInput('jfrog-url');
    const packageJsonPath = core.getInput('package-json-file-path');
    
    // Set up NPM registry and authentication
    execSync(`npm config set registry ${jfrogUrl}`);
    execSync(`npm config set //${jfrogUrl}:_authToken=${process.env.JFROG_ACCESS_TOKEN}`);

    // Publish the package
    execSync(`npm publish ${packageJsonPath} --registry ${jfrogUrl} --access public`, { stdio: 'inherit' });

    core.info('Package published successfully!');
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
