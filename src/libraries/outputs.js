const noClockLogs = require('../private/no-clock-output.js');
const withClockLogs = require('../private/with-clock-output.js');
const warnings = require('../private/warnings.js');

// Helper to add output to the terminal
const { defineModules, defineLogs } = require('../../config.yml.js');
function addOutput(text) {
    console.log(text); // Prints text to the console
    warnings(); // Prints warnings if enabled

    // Defines settings for the module
    const enabledClock = defineModules().includes('local-clock.js')
    if (!enabledClock) noClockLogs(text); // Prints text with no clock
    if (enabledClock) withClockLogs(text); // Prints text with clock
}

// Debug Output Modules
function debugOutput(text) {
    const useDebug = defineLogs().useDebug // Defines settings for the module
    if (useDebug) console.log(text); // Prints text if debug is enabled
}

module.exports = { addOutput, debugOutput };
