const Answer = require('./Answer.js');

class CommandParser {
  constructor(manager) {
    this.manager = manager;
  }

  answerMessage(msg) {
    return new Promise((resolve, reject) => {
      if (!this.manager.prefix.containedIn(msg.content)) reject(msg);

      const answer = this.generateAnswer(msg);
      if (!answer) reject(msg);

      resolve(answer);
    });
  }

  generateAnswer(msg) {
    const contentWithoutPrefix = msg.content.slice(this.manager.prefix.name.length).trimLeft();
    const match = /([^\s]+)?([ ]+(.*)?)?/.exec(contentWithoutPrefix);
    if (match) {
      const manager = this.manager;
      const commandName = match[1];
      const rawArguments = match[3];

      return new Answer({
        msg,
        manager,
        commandName,
        rawArguments,
      });
    }

    return null;
  }
}

module.exports = CommandParser;
