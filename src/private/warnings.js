const { defineModules, defineLibrarySettings, defineLogs } = require('../../config.yml.js');
module.exports = function warnings() {
    // Disable notifications if slience notifications are enabled in config.yml.js
    if (defineLibrarySettings().slienceNotifications.disable_all) return false;

    // Clock warning
    if (defineLibrarySettings().slienceNotifications.clock_warning) {
        if (!defineModules().includes('local-clock.js')) {
            console.log("You are missing the local-clock.js module to use this feature.");
            console.log("Dates and Time won't be used in the logging process.");
        }
    }

    // Debug warning
    if (defineLibrarySettings().slienceNotifications.debug_warning) {
        if (defineLogs().useDebug) {
            console.log("You have debugging enabled.");
            console.log("Messages logged will include debugging info.");
        }
    }
}