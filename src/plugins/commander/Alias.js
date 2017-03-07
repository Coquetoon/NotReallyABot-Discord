const Command = require('./Command');

/**
 * Represents an alias for a command.
 */
class Alias extends Command {
  constructor(client, cmd, aliasFor) {
    super(client, cmd);

    /**
     * The command to be aliased
     * @type {Command}
     */
    this.aliasFor = aliasFor;
  }
}

module.exports = Alias;
