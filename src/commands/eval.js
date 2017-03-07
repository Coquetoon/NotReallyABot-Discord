const inspect = require('util').inspect;

module.exports = {
  handler: (msg, answer) => {
    const client = msg.client;
    if (client.config.bot.owners.includes(msg.author.id)) {
      const args = answer.rawArguments;
      let res;

      try {
        res = eval(args); // eslint-disable-line no-eval
        if (typeof res !== 'string') {
          res = inspect(res);
        }
      } catch (err) {
        res = err.msg;
      }
      msg.channel.sendMessage('```js\n' + res + '\n```');
    }
  },
  cmd: 'eval',
};
