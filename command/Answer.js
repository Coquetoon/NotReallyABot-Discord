class Answer {
    constructor(msg, obj) {
        this.msg = msg;
        this.prefix = obj.prefix;
        this.cmd = obj.cmd;
        this.args = obj.args;
        this.argsList = [];

        if (typeof answer.args == 'string') {
            answer.argsList = answer.args.replace(/[ ]+$/, '').split(/[ ]+/g);
        }
    }
}