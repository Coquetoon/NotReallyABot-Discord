const ColourFilter = require('../plugins/colorize/ColourFilter.js');

function normalize(name) {
    return name.replace(/_/g, '').toLowerCase().match(/\w+/g).join('');
}

function Colour(message, question, client) {
    if (message.guild === undefined) return;

    if (question.args === undefined) {
        message.reply('You must specify a colour.').then(m => m.delete(6 * 1000));
        return;
    }

    requestedColourName = normalize(question.args);

    filter = ColourFilter.filter(message.guild.roles);
    role = filter.find(role => normalize(role.name) == requestedColourName);
    
    if (role == undefined) {
        message.reply('The colour `' + question.args + '` does not exist.')
        return;
    }
    
}

module.exports = {
    handle: Colour,
    cmd: 'colour',
    aliases: ['color'],
}
