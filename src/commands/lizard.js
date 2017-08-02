const snekfetch = require('snekfetch');
exports.run = (list, msg, args, logger) => {
    list.stats.lizard++;
    list.db(list.stats);
snekfetch.get('https://nekos.life/api/lizard')
        .then(r => msg.channel.send({
            embed: {
                color: c
                author: {
                    name: "Beautiful Lizard! \\o/",
                    icon_url: list.user.avatarURL
                },
                image: {
                    url: r.body.url
                }
            }
        }).catch(e => logger.warn(e)));
