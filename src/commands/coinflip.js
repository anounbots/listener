exports.run = (list, msg) => {
  const responses = ['Heads', 'Tails'];
  return msg.channel.send(`**${msg.author.username}** flipped a coin and got **${responses[Math.floor(responses.length * Math.random())]}**`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['flip', 'coin']
  };

  exports.help = {
  name: 'coinflip',
  description: 'Flip a coin',
  usage: '<prefix>coinflip'
  };
