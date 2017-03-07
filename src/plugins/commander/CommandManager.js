const Collection = require('discord.js').Collection;
const CommandParser = require('./CommandParser');
const Prefix = require('./Prefix');

class CommandManager {
  constructor(client, prefix) {
    this.client = client;
    this.prefix = new Prefix(prefix);
    this.parser = new CommandParser(this);

    this.commands = Collection();
    this.aliases = Collection();
  }

  static asMappingKey(cmdName) {
    return cmdName.toLowerCase();
  }

  validateCommand(key, command) {
    if (this.aliases.has(key)) throw new Error(`${command.cmd} has already been set as an alias`);
    if (this.commands.has(key)) throw new Error(`${command.cmd} has already been set as a command`);
    if (/ /.exec(command)) throw new Error(`The command can't contain space. Got ${command}`);
  }

  pushCommand(command) {
    const key = this.asMappingKey(command.cmd);
    this.validateCommand(key, command);
    this.commands.set(key, command);

    return this;
  }

  pushAlias(alias) {
    const key = this.asMappingKey(alias);
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
