class Question {
    constructor(msg, obj) {
        this.msg = msg;
        this.prefix = obj.prefix;
        this.cmd = obj.cmd;
        this.args = obj.args;
        this.argsList = [];

        if (typeof this.args == 'string') {
            this.argsList = this.args.replace(/[ ]+$/, '').split(/[ ]+/g);
        }
    }

    get cmdLower() {
        if (typeof this.cmd === 'string')
            return this.cmd.toLowerCase();
        else
            return null;
    }
}

module.exports = Question;
