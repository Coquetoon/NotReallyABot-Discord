const ColourFilter = require('../plugins/colorize/ColourFilter.js');

module.exports = {
    handle: (message) => {
        if (message.guild === undefined) return;

        filter = ColourFilter.filter(message.member.roles);

        if (filter.size > 0) {
            message.reply(`Your colour roles: ${ColourFilter.mentionAll(filter, ' ')}`)
                   .then(m => m.delete((20 + filter.size) * 1000));
        } else {
            message.reply("You don't have any colour role yet.").then(m => m.delete(10 * 1000));
        }
    },
    cmd: 'mycolour',
    aliases: ['mycolors', 'mycolor', 'mycolors'],
}
