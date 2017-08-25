const superagent = require('superagent');

exports.run = (list, msg, args) => {
    const parsed = args.match(/(\d+\.?\d?\d?) ?([a-zA-Z]{3}).*([a-zA-Z]{3})$/);
    try {
        return superagent.get(`https://www.google.com/finance/converter?a=${parsed[1]}&from=${parsed[2]}&to=${parsed[3]}`).then((res) => {
            const result = res.text.match(/<span class=bld>(.+?)<\/span>/gmi) || ['Error: Value code invalid'];
            msg.channel.send(`**${parsed[1]} ${parsed[2]}** is equal to **${result[0].replace(/<\/?span( class=bld)?>/g, '')}**`);
        });
    } catch (error) {
        return 'Sorry.. couldn\'t find your request...';
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['currency']
};

exports.help = {
    name: 'value',
    description: 'Checks the value of the currencies',
    usage: '<prefix>value <000 AAA to BBB>'
};