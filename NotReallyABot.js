const Discord = require('discord.js');
const Config = require ('./config.js');
const CommandParser = require('./command/CommandParser.js')
// Commands
const BotCommands = require('./BotCommands.js');
// Token
const __token = require('./.token.json')['token'];

// Bottie client
const Bottie = new Discord.Client();
const Parser = new CommandParser(Config.prefix, ' ');


Bottie.on('ready', function () {
    console.log(Config.readyConsole);

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

    let msgCmd = Parser.question(msg);
});


Bottie.login(__token);
