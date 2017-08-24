exports.run = (list, message, args) => {
    if (message.author.id !== list.config.ownerid) return;
    if (!args || args.length < 1) return message.reply('you must provide a command to reload');
    let command;
    if (list.commands.has(args[0])) {
        command = list.commands.get(args[0]);
    } else if (list.aliases.has(args[0])) {
        command = list.commands.get(list.aliases.get(args[0]));
    }
    if (!command) return message.reply(`command ${args[0]} not found`);

    command = command.help.name;

    list.reload(command);

    message.reply(`command ${command} has been reloaded`);
};