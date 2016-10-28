const ColourFilter = require('../plugins/colorize/ColourFilter.js');

function Colour(message, question, client) {
    if (message.guild === undefined) return;

    filter = ColourFilter.filter(message.member.roles);

    
}

module.exports = {
    handle: Colour,
    cmd: 'colour',
    aliases: ['color'],
}
