const Discord = require('discord.js');
// Commands
const BotCommands = require('./bot/BotCommands.js');
const CommandParser = require('./slave/CommandParser.js')
const CommandManager = require('./slave/CommandManager.js')
// Token
const __token = require('./.token.json')['token'];

// Bottie client
const Bottie = new Discord.Client();
Bottie.config = require('./config.js');
Bottie.parser = new CommandParser(Bottie.config.prefix, ' ');
Bottie.commandManager = new CommandManager(Bottie, BotCommands);

Bottie.on('ready', function () {
    console.log(this.config.readyConsole);

    this.user.setGame(this.config.game);

    for (index in this.config.ready) {
        ready = this.config.ready[index];
        channel = this.channels.get(ready.id);

        if (channel && channel.permissionsFor(this.user).hasPermission('SEND_MESSAGES')) {
            channel.sendMessage(ready.message);
        }
    }
});

Bottie.on('message', (msg) => {
    const client = msg.client;
    if (client.config.ignoringMyself && msg.author === client.user) return;
    if (!Bottie.parser.hasPrefix(msg.content)) return;

    let question = Bottie.parser.expressQuestion(msg);

    Bottie.commandManager.answerQuestion(msg, question);
});


Bottie.login(__token);
