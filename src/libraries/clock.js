const date = require('date-and-time');

const now = new Date(); // Get the current date
const pattern = date.compile('YYYY-MM-DD');
const currenttime = date.format(now, pattern);

// Export the current date in YYYY-MM-DD format
module.exports = currenttime