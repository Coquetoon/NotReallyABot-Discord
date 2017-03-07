class Answer {
  constructor({ msg, manager, commandName, rawArguments } = {}) {
    this.client = manager.client;
    /**
     * The command manager that created the instance of the Answer.
     * @type {CommandManager}
     */
    this.manager = manager;

    /**
     * The sent message.
     * @type {Prefix}
     */
    this.msg = msg;

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
    this.command = this.manager.getCommand(this.commandName);

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

  executeCommand() {
    return new Promise((resolve, reject) => {
      if (!this.command) reject(this);

      const result = this.command.handler(this.msg, this);

      return result;
    });
  }
}

module.exports = Answer;
