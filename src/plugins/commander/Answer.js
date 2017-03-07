class Answer {
  constructor({ manager, commandName, rawArguments } = {}) {
    this.manager = manager;

    this.prefix = this.manager.prefix;
    this.commandName = commandName;
    this.command = this.commandName !== undefined && this.manager.getCommand(this.commandName);
    this.rawArguments = rawArguments || '';
    this.arguments = this.rawArguments.split(/[^\S]+/g);
  }
}

module.exports = Answer;
