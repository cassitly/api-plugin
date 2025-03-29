const { exceptions, defineInstallerConfig } = require("../module.conf");
const { configurePlugin } = require('../installer.conf');
const { addOutput } = require('./src/libraries/outputs');

/** Configured Dependencies */
const git = defineInstallerConfig().modules.git;
const npm = defineInstallerConfig().modules.npm;
const issues_page = defineInstallerConfig().package.issues;

/** NodeJS modules */
const { existsSync, mkdirSync, writeFileSync } = require('fs');
const path = require('path');

function configureModules(configuration_path, source_configuration_data, module) {
    /**
     * Configures the dependencies
     * @argument {string} configuration_path - Path to the config file
     * @argument {string} source_configuration_data - Data to write to the config file
     * @param {string} module - Name of the module
     * @description Configures the dependencies
     */
    addOutput(`[Source] Configuring ${module} to use local config file.`);
    try { writeFileSync(configuration_path, source_configuration_data); }
    catch (error) {
        addOutput(`[Error]: Failed to configure ${module} to use local config file.`);
        addOutput(error);
    }
}

function createLocalFolders(folder_path) {
    /**
     * Creates a folder
     * @argument {string} folder_path - Path to the folder
     * @description Creates a folder
     */
    if (!existsSync(folder_path)) { /** Checks if the folder exists */
        addOutput(`[Source]: Creating ${folder_path} as a folder...`);
        mkdirSync(folder_path); // Creates the folder
    }
}

function createLocalFiles(file_path, file_contents) {
    /**
     * Creates a file
     * @argument {string} file_path - Path to the file
     * @argument {string} file_contents - Data to write to the file
     * @description Creates a file
     */
    if (!existsSync(file_path)) { /** Checks if the file exists */
        addOutput(`[Source]: Creating ${file_path} as a file...`);
        writeFileSync(file_path, file_contents); // Creates the file
    }
}

async function installSource(module_path = path.resolve('./dependencies/')) {
    /** WARNING: This module is deprecated
     * @description This module is deprecated
     * The reason this is deprecated is because a modular version of the
     * installer was not possible. Since each installer had to be unique
     * to each application. Because it was required to install modules
     * in which this, api-plugin, is one of them. Since this module is
     * not easily able to be copied over. A new template source for the
     * installer has been made. At (BLANK), please visit that repository
     * for the supported version of the installer.
     */

    console.error("[Deprecated]: Due to the lack of a modular version of the installer, [...]");
    console.error("[...]: and so that the fact of each installer requires to be unique to each application, this module is deprecated.")
    throw new Error("[Error]: This module is deprecated. Please use the new installer template. At (BLANK)");

    /** Installer Process */
    try {
        npm.name.forEach(async (module) => {
            const module_name = path.join(module_path, module);
            const node_path = path.join(module_name, "node_modules")
    
            git.url.forEach((link) => {
                /** Checks if this module was already installed */
                if (existsSync(module_name)) return false;
                if (link !== verify_modules[module]) return false;

                /** Downloads the module */
                addOutput(`[Source]: Downloading ${module}...`); // Tells the user what the APP is downloading.
                require('child_process').execSync(`cd ${module_path} && git clone ${link}`);
            });

            /** Configures the dependencies */
            await configurePlugin(module_name, module);
    
            /** Installs the dependencies */
            if (!existsSync(node_path)) {
                /** Exceptions of dependency */
                if (exceptions(module) === "SE") return false;

                /** Installs the dependencies */
                addOutput(`[Source]: Installing ${module}...`);
                require('child_process').execSync(`cd ${module_name} && npm install`);
            }
        });
    } catch (error) {
        addOutput(`[Caught-Error]: ${error}.`);
        addOutput(`[Error]: Please report this error to ${issues_page}.`);
    }
}

module.exports = { installSource, configureModules, createLocalFiles, createLocalFolders };