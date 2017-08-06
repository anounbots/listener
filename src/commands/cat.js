const superagent = require('superagent');

exports.run = (list, msg, args, logger) => {
    list.stats.cat++;
    list.db(list.stats);
    superagent.get('http://random.cat/meow')
      .type('application/json')
      .end((error, response) => {
        if (error) {
          logger.warn(error);
          return msg.channel.send('Something went wrong...');
        }
        return msg.channel.send({
          embed: {
            color: 0x008000,
            author: {
              name: 'Lovely cats :3',
              icon_url: list.user.avatarURL
            },
            image: { url: response.body.file }
          }
        });
      });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kitty']
  };

  exports.help = {
  name: 'cat',
  description: 'sends a random cat from http://random.cat/',
  usage: '<prefix>cat'
  };
