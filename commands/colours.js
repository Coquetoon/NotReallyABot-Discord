const ColourFilter = require('../plugins/colorize/ColourFilter.js');

module.exports = {
    handle: (message) => {
        if (message.guild === undefined) return;

        filter = ColourFilter.filter(message.guild.roles);

        content = `Available colours. Total: ${filter.size}`
                  + '\nUse **bottie colour *ColourName*** to select a colour.\n\n'
                  + ColourFilter.mentionAll(filter,
                                            '     ',
                                            message.client.config.maxRolesPerLine || 5);

        message.reply(content).then(m => m.delete(((filter.size*4) + 20) * 1000));
    },
    cmd: 'colours',
    aliases: ['colors'],
}
