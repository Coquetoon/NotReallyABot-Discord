const Discord = require('discord.js');
const Config = require ('./config.js');
const CommandParser = require('./slave/CommandParser.js')
// Commands
const BotCommands = require('./bot/BotCommands.js');
const CommandManager = require('./command/CommandManager.js')
// Token
const __token = require('./.token.json')['token'];

// Bottie client
const Bottie = new Discord.Client();
Bottie.Parser = new CommandParser(Config.prefix, ' ');
// Bottie.CommandManager = new CommandManager(BotCommands);

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
    if (!Parser.eligible(msg.content)) return;

    let answer = Parser.question(msg);

    // Bottie.CommandManager.callCommand(Parser.question(msg));
});


Bottie.login(__token);
