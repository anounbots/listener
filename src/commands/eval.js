const snekfetch = require('snekfetch');

function clean(text) {
    if (typeof(text) === 'string')
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

exports.run = (client, msg, args) => {
if (msg.author.id != 'id') return;
  args = args.join(" ");
  try {
    var evaled = eval(args);
    if (typeof evaled !== 'string')
    evaled = require('util').inspect(evaled);
    if (evaled.length > 1500) {
      snekfetch
        .post('http://haste.passthemayo.space/documents')
        .send(clean(evaled))
        .then(rsp => {
          msg.reply(`:neutral_face: **|** Evaluation was over 2000 chars, Uploaded to hastebin!\n**Link**: https://haste.passthemayo.space/${rsp.body.body}.js`)
        })
    } else {
      msg.channel.send(`:white_check_mark: **|** Eval has been successful! Results:\n\`\`\`js\n${clean(evaled)}\n\`\`\``);
    }
  } catch (err) {
    msg.channel.send(`:x: **|** An error has occured!\n\`\`\`js\n${clean(err)}\n\`\`\``);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ev', 'js']
  };

  exports.help = {
  name: 'eval',
  description: 'Evaluates Javascript code.',
  usage: '<prefix>eval [js_snippet]'
  };
