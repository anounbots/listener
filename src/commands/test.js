const sql = require('sqlite');
sql.open('../database/db.sqlite');

exports.run = (list, msg) => {
    sql.run(`SELECT * FROM guilds WHERE guildID = '${msg.guild.id}'`).then(guild => {
        if (guild.nsfwID === null) {
            return msg.reply('you did not set a nsfw channel');
        }
        if (guild.nsfwID !== msg.channel.id) {
            return msg.reply('this channel is not nsfw!');
        } else {
            msg.reply('this channel is nsfw!');
        }
    });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: []
};

exports.help = {
    name: 'test',
    description: 'test',
    usage: '<prefix>test'
};