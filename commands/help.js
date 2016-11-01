module.exports = {
    handle: (message, question, client) => {
        message.author.sendMessage(client.commandManager.helpMessage)
            .then(function (m) {
                if (message.guild) message.reply('I have sent your help! :yum:')
            });
    },
    cmd: 'help',
    'aliases': ['halp', 'h']
}
