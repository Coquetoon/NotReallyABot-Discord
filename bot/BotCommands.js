const Command = require('../slave/Command.js');
const Colours = require('../commands/colours.js');

const BotCommands = {
    Colours: new Command(Colours),
}

module.exports = BotCommands;
