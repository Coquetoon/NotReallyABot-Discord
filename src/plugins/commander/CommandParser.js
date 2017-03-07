const Answer = require('./Answer.js')

class CommandParser {
  constructor(manager) {
    this.manager = manager;
  }

  answerMessage(msg) {
    return new Promise((resolve, reject) => {
      if (!this.manager.prefix.containedIn(msg.content)) reject(msg);

      const answer = this.findCommand(msg.content);
      if (!answer) reject(msg);

      resolve(answer);
    });
  }

  generateAnswer(content) {
    const contentWithoutPrefix = content.slice(this.manager.prefix.name.length).trimLeft();
    const match = /([^\s]+)?([ ]+(.*)?)?/.exec(content);
    if (match) {
      return new Answer({
        manager: this.manager,
        commandName: match[1],
        rawArguments: match[3],
      });
    }
  }
}

module.exports = CommandParser;
