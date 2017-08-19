const { Client, Collection } = require('discord.js');
const list = new Client({
    disableEveryone: true,
    disabledEvents: [
        'FRIEND_ADD',
        'FRIEND_REMOVE'
    ]
});
const logger = require('./util/Logger.js');
const config = require('./config/config.json');
const sql = require('sqlite');
const fs = require('fs');
sql.open('./database/db.sqlite');
require('./util/utils.js')(list);

list.on('ready', () => {
    list.user.setGame(`tlhelp | ${list.guilds.size} servers!`);
    logger.info('3');
    logger.info('2');
    logger.info('1');
    logger.info(`Listener is ready on ${list.guilds.size} servers with ${list.users.size} users!`);
});


list.commands = new Collection();
list.aliases = new Collection();
fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);
    files.forEach(f => {
        let props = require(`./commands/${f}`);
        list.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            list.aliases.set(alias, props.help.name);
        });
    });
});

list.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./commands/${command}`)];
            let cmd = require(`./commands/${command}`);
            list.commands.delete(command);
            list.aliases.forEach((cmd, alias) => {
                if (cmd === command) list.aliases.delete(alias);
            });
            list.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                list.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
list.on('message', async(msg) => {
    sql.get(`SELECT * FROM guilds WHERE guildID ='${msg.guild.id}'`).then(guild => {
        if (!guild) {
            sql.run('INSERT INTO guilds (guildID, prefix, ownerID, nsfwID) VALUES (?, ?, ?, ?)', [msg.guild.id, 'tl', msg.guild.owner.id, null]);
        } else {
            if (msg.author.bot) return;
            if (!msg.content.startsWith(guild.prefix)) return;

            const args = msg.content.split(' ');
            const command = args.shift().slice(guild.prefix.length);

            let cmd;
            if (list.commands.has(command)) {
                cmd = list.commands.get(command);
            } else if (list.aliases.has(command)) {
                cmd = list.commands.get(list.aliases.get(command));
            }
            if (cmd) {
                cmd.run(list, msg, args);
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