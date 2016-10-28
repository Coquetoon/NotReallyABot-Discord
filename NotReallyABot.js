const Discord = require('discord.js');
const Config = require ('./config.js');
// Commands
const BotCommands = require('./bot/BotCommands.js');
const CommandParser = require('./slave/CommandParser.js')
const CommandManager = require('./slave/CommandManager.js')
// Token
const __token = require('./.token.json')['token'];

// Bottie client
const Bottie = new Discord.Client();
Bottie.Parser = new CommandParser(Config.prefix, ' ');
Bottie.CommandManager = new CommandManager(Bottie, BotCommands);

Bottie.on('ready', function () {
    console.log(Config.readyConsole);

    this.user.setGame(Config.game);

    for (index in Config.ready) {
        ready = Config.ready[index];
        channel = this.channels.get(ready.id);

        if (channel && channel.permissionsFor(this.user).hasPermission('SEND_MESSAGES')) {
            channel.sendMessage(ready.message);
        }
    }
});

Bottie.on('message', (msg) => {
    if (Config.ignoringMyself && msg.author === msg.client.user) return;
    if (!Bottie.Parser.eligible(msg.content)) return;

    let question = Bottie.Parser.expressQuestion(msg);

    Bottie.CommandManager.answerQuestion(msg, question);
});


Bottie.login(__token);
