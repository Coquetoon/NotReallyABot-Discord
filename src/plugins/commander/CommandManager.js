const Collection = require('discord.js').Collection;
const CommandParser = require('./CommandParser');

class CommandManager {
  constructor(client, prefix) {
    this.client = client;
    this.prefix = prefix;
    this.parser = new CommandParser(this);

    this.commands = new Collection();
    this.aliases = new Collection();
  }

  static asMappingKey(cmdName) {
    return cmdName.toLowerCase();
  }

  validateCommand(key, command) {
    const cmd = command.cmd;
    if (this.aliases.has(key)) throw new Error(`${cmd} has already been set as an alias`);
    if (this.commands.has(key)) throw new Error(`${cmd} has already been set as a command`);
    if (/ /.exec(cmd)) throw new Error(`The command can't contain space. Got ${cmd}`);
  }

  pushCommand(command) {
    const key = this.asMappingKey(command.cmd);
    this.validateCommand(key, command);
    this.commands.set(key, command);

    return this;
  }

  pushAlias(alias) {
    const key = this.asMappingKey(alias.cmd);
    this.validateCommand(key, alias);
    this.aliases.set(key, alias);

    return this;
  }

  hasCommand(cmd) {
    const key = this.asMappingKey(cmd);
    return this.commands.has(key) || this.aliases.commands.has(key);
  }

  getCommand(cmd) {
    const key = this.asMappingKey(cmd);
    return this.commands.get(key) || this.getAliasCommandByKey(key);
  }

  getAliasCommand(cmd) {
    const key = this.asMappingKey(cmd);
    return this.getAliasCommandByKey(key);
  }

  getAliasCommandByKey(key) {
    const alias = this.aliases.get(key);
    if (alias) return alias.aliasFor;

    return null;
  }

  deleteCommand(cmd) {
    this.commands.delete(this.asMappingKey(cmd));

    return this;
  }

  deleteAlias(cmd) {
    this.commands.delete(this.asMappingKey(cmd));

    return this;
  }
}

module.exports = CommandManager;
