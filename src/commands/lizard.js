const snekfetch = require('snekfetch');
exports.run = (list, msg, args, logger) => {
    list.stats.lizard++;
    list.db(list.stats);
    snekfetch.get('https://nekos.life/api/lizard')
        .then(r => msg.channel.send({
            embed: {
                color: 0x008000,
                author: {
                    name: 'Beautiful Lizard! \\o/',
                    icon_url: list.user.avatarURL
                },
                image: {
                    url: r.body.url
                }
            }
        }).catch(e => logger.warn(e)));
};

exports.conf = {
  enabled: true, 
  guildOnly: false,
  aliases: ['li']
  };

  exports.help = {
  name: 'lizard',
  description: 'sends a random lizard from https://nekos.life',
  usage: '<prefix>lizard'
  };
