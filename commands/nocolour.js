const ColourFilter = require('../plugins/colorize/ColourFilter.js');

function NoColour(message, question, client) {
    if (message.guild === undefined) return;

    filter = ColourFilter.filter(message.member.roles);

    if (filter.size > 0) {
        message.member.removeRoles(filter)
            .then(gm => message.reply("I have removed your colour roles: "
                                      + ColourFilter.mentionAll(filter, ' ')))
            .catch(e => message.reply(`I can't do that, reason: ${e}`))
    } else {
        message.reply("You don't have a colour yet.")
    }
}

module.exports = {
    handle: NoColour,
    cmd: 'nocolour',
    aliases: ['nocolor', 'nocolours', 'nocolors'],
}
