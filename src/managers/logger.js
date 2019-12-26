const { stripIndents } = require('../utils');

class Logger {
    info(msg) {
        console.log(stripIndents(msg));
    }

    error(msg) {
        console.error('⚠️ \x1b[31m%s\x1b[0m', stripIndents(msg));
    }
}

module.exports = Logger;
