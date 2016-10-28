const Command = require('./command/Command.js');
const Colours = require('./plugins/colorize/Colours.js');

const BotCommands = {
    Colours: new Command(Colours),
}

module.exports = BotCommands;
