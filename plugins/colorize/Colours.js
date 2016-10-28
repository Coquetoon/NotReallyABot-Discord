function Colours(answer, colourFilter) {
    let guild = answer.msg.guild;
    if (guild === undefined) return;

    filter = colourFilter.filter(msg.guild.roles);


    msg.reply(`Available colours. Total: ${filter.size}`
              + '\nUse **bottie colour *ColourName*** to select a colour.\n\n'
              + filter.mentionAll('     '));
}

module.exports = {
    handle: Colours,
    cmd: 'colours',
    aliases: ['colors'],
}
