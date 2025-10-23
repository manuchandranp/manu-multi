const core = require('@actions/core');
const { execSync } = require('child_process');

async function run() {
  try {
    const jfrogNpmRepository = core.getInput('jfrog-npm-repository');
    const jfrogUrl = core.getInput('jfrog-url');
    const nodeVersion = core.getInput('node-version');
    const packageJsonPath = core.getInput('package-json-file-path');
    
    // Set up Node.js version (if needed)
    execSync(`npm install -g npm@latest`, { stdio: 'inherit' });
    
    // Show Node and NPM versions
    console.log(`Node Version: ${process.version}`);
    
    // Set NPM registry and authentication
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
