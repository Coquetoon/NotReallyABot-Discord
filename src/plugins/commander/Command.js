class Command {
  constructor(client, cmd) {
    this.client = client;
    this._cmd = cmd;
  }

  get cmd() {
    return this._cmd;
  }

  get cmdLower() {
    return this.cmd.toLowerCase();
  }

  compare(other) {
    if (typeof alias !== 'string') throw new Exception('Other must be a string.');
    return this.cmd.toLowerCase() === other.toLowerCase();
  }
}

module.exports = Command;
