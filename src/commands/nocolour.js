module.exports = {
  handler: (msg) => {
    if (msg.guild === undefined) return;

    const colors = msg.client.roleManager.filterColorRoles(msg.member.roles);

    if (colors.size === 0) {
      msg.reply("You don't have any colour role yet.").then(m => m.delete(10 * 1000));
      return;
    }

    msg.member.removeRoles(colors)
      .then(() => {
        const roleMentions = colors.map(color => String(color)).join(' ');
        msg.reply(`I have removed your colours ${roleMentions}`);
      })
      .catch(error =>
        msg.reply(`I couldn't remove your colour roles. Maybe I don't have permissions to manage that role.\n${error}`));
  },
  cmd: 'nocolour',
  aliases: ['nocolor', 'nocolours', 'nocolors'],
};
