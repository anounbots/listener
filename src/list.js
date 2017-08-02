const { Client } = require('discord.js');
const list = new Client();
const logger = require('./util/Logger.js');
const config = require('./config/config.json');
const path = require('path');
const dbPath = path.resolve(__dirname, '..', 'database', 'db.sqlite');
const sql = require('sqlite');
sql.open(dbPath);
require("./util/utils.js")(list);

list.on('ready', () => {
    list.user.setGame(`tlhelp | ${list.guilds.size} servers!`);
    logger.info('3');
    logger.info('2');
    logger.info('1');
    logger.info(`Listener is ready on ${list.guilds.size} servers with ${list.users.size} users!`);
});

list.on('message', async(msg) => {
    sql.get(`SELECT * FROM guilds WHERE guildID ='${msg.guild.id}'`).then(guild => {
        if (!guild) {
            sql.run('INSERT INTO guilds (guildID, prefix, ownerID, nsfwID) VALUES (?, ?, ?, ?)', [msg.guild.id, 'tl', msg.guild.owner.id, null]);
        } else {
            if (msg.author.bot) return;
            if (!msg.content.startsWith(guild.prefix)) return;

            const args = msg.content.split(' ');
            const command = args.shift().slice(guild.prefix.length);

            try {
                let commandFile = require(`./commands/${command}.js`);
                commandFile.run(list, msg, args, logger);
            } catch (err) {
                if (err.stack.startsWith('Error: Cannot find module')) return;
                logger.error(err);
                msg.channel.send({ embed: { color: config.embedColor, title: err.stack.split('\n')[0], description: err.message + '\n' + err.stack.split('\n')[1] + '\n Please, go over to: so AnounFX™#3494 can fix error' } });
            }
        }
    }).catch(() => {
        logger.error();
        sql.run('CREATE TABLE IF NOT EXISTS guilds (guildID TEXT, prefix TEXT, ownerID TEXT, nsfwID TEXT)').then(() => {
            sql.run('INSERT INTO guilds (guildID, prefix, ownerID, nsfwID) VALUES (?, ?, ?, ?)', [msg.guild.id, 'tl', msg.guild.owner.id, null]);
        });
    });
});

list.on('warn', (e) => {
    logger.warn(e);
});
list.on('error', (e) => {
    logger.error(e);
});
list.on('debug', (e) => {
    logger.info(e);
});

list.login(config.tokens.discord);
