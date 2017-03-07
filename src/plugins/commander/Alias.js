const Command = require('./Command');

/**
 * Represents an alias for a command.
 */
class Alias extends Command {
  constructor(cmd, aliasFor) {
    super(cmd);

    /**
     * The command to be aliased
     * @type {Command}
     */
    this.aliasFor = aliasFor;
  }
}

exports.default = Alias;
