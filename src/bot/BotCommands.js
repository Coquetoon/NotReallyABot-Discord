const Colour = require('../commands/colour.js');
const Colours = require('../commands/colours.js');
const Eval = require('../commands/eval.js');
// const Help = require('../commands/help.js');
const MyColour = require('./../commands/mycolour.js');
const NoColour = require('../commands/nocolour.js');

const BotCommands = [
  Colour,
  Colours,
  Eval,
  // Help,
  MyColour,
  NoColour,
];

module.exports = BotCommands;
