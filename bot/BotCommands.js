const Command = require('../slave/Command.js');
const Colours = require('../commands/colours.js');
const MyColours = require('../commands/mycolours.js');

const BotCommands = {
    Colours: new Command(Colours),
    MyColours: new Command(MyColours),
}

module.exports = BotCommands;
