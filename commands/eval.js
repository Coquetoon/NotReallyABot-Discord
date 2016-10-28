module.exports = {
    handle: (message, question) => {
        const client = message.client;
        if (client.config.masters.includes(message.author.id)) {
            var args = question.args;
            // client.log('EVAL WAS RUN!');
            try {
                var res = eval(args); // eslint-disable-line no-eval
                if (typeof res !== 'string') {
                    res = require('util').inspect(res);
                }
            } catch (err) {
                res = err.message;
            }
            message.channel.sendMessage('```js\n' + res + '\n```');
        }
    },
    cmd: 'eval',
};
