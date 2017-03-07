class Answer {
  constructor({ manager, commandName, rawArguments } = {}) {
    /**
     * The command manager that created the instance of the Answer.
     * @type {CommandManager}
     */
    this.manager = manager;

    /**
     * The prefix of the command.
     * @type {Prefix}
     */
    this.prefix = this.manager.prefix;

    /**
     * The name that calls the command.
     * @type {string}
     */
    this.commandName = commandName;

    /**
     * The command which pertains to the call.
     * @type {Command}
     */
    this.command = this.commandName !== undefined
        ? this.manager.getCommand(this.commandName)
        : undefined;

    /**
     * The whole command argument.
     * @type {string}
     */
    this.rawArguments = rawArguments || '';

    /**
     * The arguments of the command split in a list.
     * @type {Prefix}
     */
    this.arguments = this.rawArguments.split(/[^\S]+/g);
  }
}

module.exports = Answer;
