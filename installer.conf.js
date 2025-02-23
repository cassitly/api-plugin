const { readFileSync, } = require('fs');
const { configureModules, createLocalFolders, createLocalFiles } = require('./src/installer');
const path = require('path');

const configuration_data = readFileSync(path.resolve('./source.conf.js'), 'utf8');

async function configurePlugin(module_name, module) {
    /** Checks if plugin is configured */
    if (module === "your_dependency_name") {
        /** Configures dependencies */
        const config_path = path.join(module_name, "Example Config.js"); // Path to the config file
        const config_data = readFileSync(config_path, 'utf8'); // Reads the config file

        /** Configures dependencies */
        if (configuration_data !== config_data) {
            configureModules(config_path, configuration_data, module); // Configures the dependencies
            createLocalFolders(path.resolve("./example/")) // Creates the example folder
            createLocalFiles(path.resolve("./example/Example Config.js"), configuration_data); // Creates the example config file
        }
    }
}

module.exports = { configurePlugin };