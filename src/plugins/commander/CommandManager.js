const Collection = require('discord.js').Collection;
const CommandParser = require('./CommandParser');
const Prefix = require('./Prefix');

class CommandManager {
  constructor(client, prefix) {
    this.client = client;
    this._prefix = new Prefix(prefix);
    this.parser = new CommandParser(this);

    this.commands = Collection();
    this.aliases = Collection();
  }

  get prefix() {
    return this._prefix;
  }

  _asMappingKey(cmdName) {
    return cmdName.toLowerCase();
  }

  _validateCommand(key, command) {
    if (this.aliases.has(key)) throw new Error(`${command.cmd} has already been set as an alias`);
    if (this.commands.has(key)) throw new Error(`${command.cmd} has already been set as a command`);
    if (/ /.exec(command)) throw new Error(`The command can't contain space. Got ${command}`);
  }

  pushCommand(command) {
    const cmd = this._asMappingKey(command.cmd);
    this._validateCommand(key, command);
    this.commands.set(cmd, command);

    return this;
  }

  pushAlias(alias) {
    const key = this._asMappingKey(alias);
    this._validateCommand(key, command);
    this.aliases.set(key, alias);

    return this;
  }

  hasCommand(cmd) {
    const key = this._asMappingKey(cmd);
    const cmdLower = this.cmdLower;

    return this.commands.has(cmdLower) || this.aliases.commands.has(cmdLower);
  }

  getCommand(cmd) {
    const key = this._asMappingKey(cmd);

    return this.commands.get(key) || this.getAliasCommandByKey(key);
  }

  getAliasCommand(cmd) {
    const key = this._asMappingKey(cmd);
    return this.getAliasCommandByKey(key);
  }

  getAliasCommandByKey(key) {
    const alias = this.aliases.get(key);
    if (alias) return alias.aliasFor;
  }

  deleteCommand(cmd) {
    this.commands.delete(this._asMappingKey(cmd));

    return this;
  }

  deleteAlias(cmd) {
    this.commands.delete(this._asMappingKey(cmd));

    return this;
  }
}

module.exports = CommandManager;
