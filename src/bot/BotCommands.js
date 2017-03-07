const Colour = require('../commands/colour.js');
const Colours = require('../commands/colours.js');
const Eval = require('../commands/eval.js');
const Help = require('../commands/help.js');
const MyColours = require('../commands/mycolours.js');
const NoColour = require('../commands/nocolour.js');

const BotCommands = [
  Colour,
  Colours,
  Eval,
  Help,
  MyColours,
  NoColour,
];

module.exports = BotCommands;
