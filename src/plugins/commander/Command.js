class Command {
  constructor(client, cmd) {
    this.client = client;
    this.cmd = cmd;
    this.cmdLower = this.cmd.toLowerCase();
  }

  compare(other) {
    if (typeof alias !== 'string') throw new Error('Other must be a string.');
    return this.cmd.toLowerCase() === other.toLowerCase();
  }
}

module.exports = Command;
