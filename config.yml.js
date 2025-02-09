function definePaths() {
    // Define your paths to the save files if you were to use outputs.js
    const pathing = { log: { filename: "api-plugin", extension: ".log", path: "./logs/" } }
    return pathing; // Returns the path directories
}

function defineModules() {
    // Define your modules if you were to use local libraries
    const modules = ["local-clock.js"];
    return modules; // Returns the modules

    // WARNING: disabling "local-clock.js" by removing it, will only
    // Allow the plugin to generate one log file and only use that one
    // Log file. And cannot make more.
}

function defineLogs() {
    // Define your log settings for output.js
    const settings = { message: "This is a default message, you can set this to empty if you want", useDebug: false };
    return settings; // Returns the log settings
}

function defineLibrarySettings() {
    // Define your library settings if you were to use local libraries
    const settings = { slienceNotifications: { clock_warning: false, debug_warning: true, disable_all: false } };
    return settings; // Returns the library settings
}

module.exports = { definePaths, defineModules, defineLogs, defineLibrarySettings };