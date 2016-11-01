const Question = require('./Question.js')

const splitRegEx = /(\w+)( (?!$)([\s\S]*))?/;

class CommandParser {
    constructor(prefix) {
        if (typeof(prefix) !== 'string') throw new TypeError('The prefix must be a string.');

        this._prefix = prefix;
    }

    hasPrefix(content) {
        return content.toLowerCase().startsWith(this.prefix);
    }

    expressQuestion(msg) {
        return new Question(msg, this.split(msg.content));
    }

    split(content) {
        let slice = content.slice(this.prefix.length);
        let match = splitRegEx.exec(slice.replace(/^[ ]+/, ''));

        return {
            'prefix': this.prefix,
            'cmd': match[1],
            'args': match[3],
        }
    }

    get prefix() {
        return this._prefix;
    }
}

module.exports = CommandParser;
