const ColourFilter = require('../plugins/colorize/ColourFilter.js');
const ColourCommand = require('./colour.js');
const Config = require('../config.js');

const ColourSyntax = `**${Config.prefix} ${ColourCommand.cmd} *${ColourCommand.args.join(' ')}***`;
var separator = '     '

module.exports = {
    handle: (message) => {
        if (message.guild === undefined) return;

        var filter = ColourFilter.filter(message.guild.roles);
        
        var heading = `Available colours. Total: ${filter.size}`
            + `\nUse ${ColourSyntax} to select a colour.\n\n`

        var messagesToSend = ColourFilter.mentionAll(
                heading,
                filter,
                true,
                separator,
                message.client.config.maxRolesPerLine || 5);

        for (var index = 0; index < messagesToSend.length; index++) {
            message.reply(messagesToSend[index])
                .then(m => m.delete(((filter.size*4) + 20) * 1000))
                .catch(console.error);
        }
    },
    cmd: 'colours',
    aliases: ['colors'],
}
