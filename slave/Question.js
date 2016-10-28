class Question {
    constructor(msg, obj) {
        this.msg = msg;
        this.prefix = obj.prefix;
        this.cmd = obj.cmd;
        this.args = obj.args;
    }

    get argsList() {
        if (this._argsList === undefined) {
            if (typeof this.args == 'string') {
                this._argsList = this.args.replace(/[ ]+$/, '').split(/[ ]+/g);
            }
        }
        return this._argsList;
    }

    get cmdLower() {
        if (typeof this.cmd === 'string')
            return this.cmd.toLowerCase();
        else
            return null;
    }
}

module.exports = Question;
