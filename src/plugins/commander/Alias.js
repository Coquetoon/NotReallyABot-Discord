const Command = require('./Command');

class Alias extends Command {
  constructor(cmd, aliasFor) {
    super(cmd);

    this.aliasFor = cmd;
  }
}

exports.default = Alias;
