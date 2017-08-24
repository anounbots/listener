exports.run = (list, msg, args) => {
    if (!args[0]) {
        return msg.channel.send({ embed: {
            title: `Commands (${list.commands.size})`,
            color: 0x008000,
            description: list.commands.map(cmd => cmd.help.name).sort().join(', ')
        } });
    }

    if (!list.commands.has(args[0]) && !list.aliases.has(args[0])) {
        return msg.channel.send(`Commands ${args[0]} wasn't found.`);
    }

    const help = list.commands.has(args[0]) ? list.commands.get(args[0]).help : list.commands.get(list.aliases.get(args[0])).help;
    const conf = list.commands.has(args[0]) ? list.commands.get(args[0]).conf : list.commands.get(list.aliases.get(args[0])).conf;

    msg.channel.send({ embed: {
        title: `Help for ${help.name}`,
        color: 0x008000,
        fields: [
            { 'name': 'Description: ', value: help.description.toString(), inline: true },
            { 'name': 'Usage: ', value: help.usage, inline: true },
            { 'name': 'Aliases: ', value: conf.aliases[0] ? conf.aliases.join(', ') : 'None', inline: true },
            { 'name': 'Enabled: ', value: conf.enabled, inline: true }
        ]
    } });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['command', 'commands', 'cmds']
  };

  exports.help = {
  name: 'help',
  description: 'Gives help about stuff.',
  usage: '<prefix>help <command | no args>'
  };
