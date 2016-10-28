const ColourFilter = require('../plugins/colorize/ColourFilter.js');
const Config = require('../config.js')

function MyColours(message, answer, client) {
    if (message.guild === undefined) return;

    filter = ColourFilter.filter(message.member.roles);

    if (filter.size > 0) {
        message.reply(`Your colour roles: ${ColourFilter.mentionAll(filter, ' ')}`)
               .then(m => m.delete(20 + filter.size));
    } else {
        message.reply("You don't have any colour role yet.").then(m => m.delete(10));
    }
}

module.exports = {
    handle: MyColours,
    cmd: 'mycolours',
    aliases: ['mycolors'],
}
