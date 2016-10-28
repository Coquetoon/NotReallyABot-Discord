class Answer {
    constructor(msg, obj) {
        this.msg = msg;
        this.prefix = obj.prefix;
        this.cmd = obj.cmd;
        this.cmdLower = this.cmd.toLowerCase();
        this.args = obj.args;
        this.argsList = [];

        if (typeof this.args == 'string') {
            this.argsList = this.args.replace(/[ ]+$/, '').split(/[ ]+/g);
        }
    }
}

module.exports = Answer;
