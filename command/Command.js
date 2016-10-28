
class Command {
    constructor(command) {
        this.handle = command.handle;
        this._cmd = command.cmd;

        this._aliases = [];
        this.addAliases(command.aliases);
    }

    get cmd() {
        return this._cmd;
    }

    get aliases() {
        return this._aliases;
    }

    addAlias(alias) {
        if (typeof alias !== 'string') throw new Exception('Alias must be a string.');
        this.aliases.push(alias);
    }

    addAliases(aliasList) {
        for (let index in aliasList) {
            this.addAlias(aliasList[index]);
        }
    }
}

module.exports = Command;
