module.exports = {
    handle: (msg, question) => {
        const client = msg.client;
        if (client.config.masters.includes(msg.author.id)) {
            var args = question.args;
            // client.log('EVAL WAS RUN!');
            try {
                var res = eval(args); // eslint-disable-line no-eval
                if (typeof res !== 'string') {
                    res = require('util').inspect(res);
                }
            } catch (err) {
                res = err.msg;
            }
            msg.channel.sendMessage('```js\n' + res + '\n```');
        }
    },
    cmd: 'eval',
};
