
const splitRegEx = /(\w+)( (?!$)([\s\S]*))?/;

class CommandParser {
    constructor(prefix, requireSpace=false) {
        if (typeof(prefix) !== 'string') throw new TypeError('The prefix must be a string.');

        this._requireSpace = requireSpace;
        this._prefix = prefix;
    }

    hasPrefix(content) {
        return content.toLowerCase().startsWith(this.prefix);
    }

    eligible(content) {
        if (!this.hasPrefix(content)) return false;
        if (content.length == this.prefix.length) return true;

        let startsWithSpace = content[this.prefix.length].startsWith(' ');

        if (this.requireSpace) {
            return startsWithSpace;
        } else {
            return !startsWithSpace;
        }
    }

    split(content) {
        let slice = content.slice(this.prefix.length);
        let match = splitRegEx.exec(slice.replace(/^[ ]+/, ''));

        let answer = {}

        answer.prefix = this.prefix;
        answer.command = match[1];
        answer.args = match[3];
        answer.argsList = [];
        if (typeof answer.args == 'string') {
            answer.argsList = answer.args.replace(/[ ]+$/, '').split(/[ ]+/g);
        }

        return answer;
    }

    get prefix() {
        return this._prefix;
    }

    get requireSpace() {
        return this._requireSpace;
    }
}

module.exports = CommandParser;
