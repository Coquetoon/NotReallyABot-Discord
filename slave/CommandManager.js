const Collection = require('discord.js').Collection;

class CommandManager {
    constructor(client, commands={}, noCommand=null, unknownCommand=null) {
        console.log(commands);
        this.client = client;
        this.commands = new Collection();
        this.aliases = new Collection();
        this.noCommand = noCommand;
        this.unknownCommand = unknownCommand;
        this.addCommands(commands);
    }

    _insertCommandAlias(alias, command) {
        this.aliases.set(alias.toLowerCase(), command);
    }

    _insertCommandAliases(command) {
        for (let alias in command.aliases) {
            this._insertCommandAlias(alias, command);
        }
    }

    addCommand(command) {
        this.commands.set(command.cmdLower, command);
        this._insertCommandAliases(command);
    }

    addCommands(commands) {
        for (let command in commands) {
            this.addCommand(commands[command]);
        }
    }

    answerQuestion(msg, question) {
        if (question.cmd === undefined) {
            if (typeof this.noCommand === 'function') {
                return this.noCommand.handle(msg, question, this.client);
            }
            return null;
        }

        let command = this.commands.get(question.cmdLower);

        if (command === undefined) {
            if (typeof this.unknownCommand === 'function') {
                return this.unknownCommand.handle(msg, question, this.client);
            }
            return null;
        }

        return command.handle(msg, question, this.client);
    }
}

module.exports = CommandManager;
