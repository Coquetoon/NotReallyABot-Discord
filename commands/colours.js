const ColourFilter = require('../plugins/colorize/ColourFilter.js');
const ColourCommand = require('./colour.js');
const Config = require('../config.js');

const ColourSyntax = `**${Config.prefix} ${ColourCommand.cmd} *${ColourCommand.args.join(' ')}***`;

module.exports = {
    handle: (message) => {
        if (message.guild === undefined) return;

        filter = ColourFilter.filter(message.guild.roles);


        content = `Available colours. Total: ${filter.size}`
                  + `\nUse ${ColourSyntax} to select a colour.\n\n`
                  + ColourFilter.mentionAll(filter,
                                            true,
                                            '     ',
                                            message.client.config.maxRolesPerLine || 5);

        message.reply(content).then(m => m.delete(((filter.size*4) + 20) * 1000));
    },
    cmd: 'colours',
    aliases: ['colors'],
}
