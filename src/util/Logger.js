const chalk = require('chalk');

class Logger {

    /**
     * Info logging!
     * @param {String} message message to print out
     * @static
     */
    static info(message) {
        return console.log(`${chalk.bgGreen('[INFO]')} ${chalk.green(message)}`);
    }

    /**
     * Warning logging!
     * @param {String} message message to print out
     * @static
     */
    static warn(message) {
        return console.log(`${chalk.bgYellow('[WARN]')} ${chalk.yellow(message)}`);
    }

    /**
     * Error logging!
     * @param {String} message message to print out
     * @static
     */
    static error(message) {
        return console.log(`${chalk.bgRed('[ERROR]')} ${chalk.red(message)}`);
    }
}

module.exports = Logger;

/*
Credits to: https://github.com/augubots/YumiBot/blob/master/src/Logger/Logger.js
*/
