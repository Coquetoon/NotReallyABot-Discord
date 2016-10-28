class Question {
    constructor(msg, obj) {
        this.msg = msg;
        this.prefix = obj.prefix;
        this.cmd = obj.cmd;
        if (typeof this.cmd === 'string')
            this.cmdLower = this.cmd.toLowerCase();
        else
            this.cmdLower = null;
        this.args = obj.args;
        this.argsList = [];

        if (typeof this.args == 'string') {
            this.argsList = this.args.replace(/[ ]+$/, '').split(/[ ]+/g);
        }
    }
}

module.exports = Question;
