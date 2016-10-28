const ColourFilter = require('../plugins/colorize/ColourFilter.js');

function normalize(name) {
    return name.replace(/_/g, '').toLowerCase().match(/\w+/g).join('');
}

module.exports = {
    handle: (message, question) => {
        if (message.guild === undefined) return;

        if (question.args === undefined) {
            message.reply('You must specify a colour.').then(m => m.delete(6 * 1000));
            return;
        }

        requestedColourName = normalize(question.args);

        filter = ColourFilter.filter(message.guild.roles);
        role = filter.find(role => normalize(role.name) == requestedColourName);
        
        if (role == undefined) {
            message.reply('The colour `' + question.args + '` does not exist.');
            return;
        }

        if (message.member.roles.exists('id', role.id)) {
            message.reply(`You already have the colour ${role}`);
            return;
        }

        let memberColours = ColourFilter.filter(message.member.roles);

        message.member.addRole(role)
            .then(gm => {
                message.reply(`Enjoy your new colour ${role}!`);

                if (memberColours.size > 0) {
                    rmColour = () => gm.removeRoles(memberColours)
                        .catch(e => console.log(`I couldn't remove your old colour. Reason: ${e}`));
                    setTimeout(rmColour, 500);
                }

            })
            .catch(e => message.reply(`I couldn't give you that colour! Maybe I don't have permissions to manage that role.\n${e}`));
    },
    cmd: 'colour',
    aliases: ['color'],
}
