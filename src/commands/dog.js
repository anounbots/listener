const superagent = require('superagent');

exports.run = (list, msg, args, logger) => {
    list.stats.dog++;
    list.db(list.stats);
    superagent.get('http://random.dog/woof.json')
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
              name: 'Lovely dogs :3',
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
  aliases: ['woof']
  };

  exports.help = {
  name: 'dog',
  description: 'sends a random dog from http://random.dog/',
  usage: '<prefix>dog'
  };
