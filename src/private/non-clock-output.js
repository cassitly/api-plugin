const { existsSync, appendFileSync, writeFileSync } = require('fs')
const { definePaths, defineLogs } = require('../../config.yml.js')
module.exports = function noClockLogs(text) {
    // Define your paths to the save files if you were to use outputs.js
    const logPath = definePaths().log.path;
    const logName = definePaths().log.filename;
    const logExtension = definePaths().log.extension;

    // Define Logging Message upon creation
    const logMessage = defineLogs().message;
    const formattedMessage = '\n' + logMessage + '\n'
    const formattedLog = text + '\n'

    if (existsSync(logPath + logName + logExtension)) {
        appendFileSync(logPath + logName + logExtension, formattedLog, 'utf8')
        return false; // Stops the execution from writing a new file.
    }

    writeFileSync(logPath + logName + logExtension, formattedMessage, 'utf8')
    appendFileSync(logPath + logName + logExtension, formattedLog, 'utf8')
}