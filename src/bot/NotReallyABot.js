const Discord = require('discord.js');
const BotCommands = require('./BotCommands.js');
const Command = require('./../plugins/commander/Command');
const CommandManager = require('./../plugins/commander/CommandManager');
const Alias = require('./../plugins/commander/Alias');
const Prefix = require('./../plugins/commander/Prefix');

const Client = Discord.Client;

class NotReallyABot extends Client {
  constructor(config) {
    super();

    this.config = config;
    this.prefix = new Prefix(this, this.config.command.prefix, this.config.command.config);
    this.commandManager = new CommandManager(this, this.prefix);

    BotCommands.forEach((command) => {
      const handler = command.handler;
      const cmd = command.cmd;
      const aliases = command.aliases || [];
      const botCommand = new Command(
          this,
          cmd,
          { handler },
        );

      this.commandManager.pushCommand(botCommand);

      aliases.forEach(alias =>
        this.commandManager.pushAlias(new Alias(this, alias, botCommand)));
    });
  }
}

module.exports = NotReallyABot;
