const path = require('path');
const dbPath = path.resolve(__dirname, '..', 'database', 'db.sqlite')
const sql = require('sqlite');
sql.open(dbPath);
exports.run = (list, msg, args, logger) => {
    let feature = args[0]
    let to = args.slice(1).join(' ')
    if (feature === 'prefix') {
        sql.get(`SELECT * FROM guilds WHERE guildID ='${msg.guild.id}'`).then(guild => {
        if (!guild) {
            sql.run('INSERT INTO guilds (guildID, prefix, ownerID) VALUES (?, ?, ?)', [msg.guild.id, 'tl', msg.guild.owner.id])
            msg.channel.send('**Inserting this guild into the database!**')
            msg.delete(1500)
        } else {
                if (!to) return msg.reply('You must specify a prefix!')
                sql.run(`UPDATE guilds SET prefix ='${to}' WHERE guildID ='${msg.guild.id}'`)
                msg.reply(`:white_check_mark: Prefix was succefully changed to **${to}**`) 
        }
    }).catch(() => {
        logger.error();
        sql.run("CREATE TABLE IF NOT EXISTS guilds (guildID TEXT, prefix TEXT, ownerID TEXT)").then(() => {
            sql.run('INSERT INTO guilds (guildID, prefix, ownerID) VALUES (?, ?, ?)', [msg.guild.id, to, msg.guild.owner.id])
            msg.reply(':white_check_mark: Success! You have changed the prefix!')
        });
    });
    } 
};
