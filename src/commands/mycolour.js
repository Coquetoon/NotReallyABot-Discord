module.exports = {
  handler: (msg) => {
    if (msg.guild === undefined) return;

    const colors = msg.client.roleManager.filterColorRoles(msg.member.roles);

    if (colors.size === 0) {
      msg.reply("You don't have any colour role yet.").then(m => m.delete(10 * 1000));
      return;
    }

    const roleMentions = colors.map(color => String(color)).join(' ');
    const timeToDelete = (10 + (colors.size * 2)) * 1000;

    msg.reply(`Your colour roles: ${roleMentions}`)
      .then(m => m.delete(timeToDelete))
      .catch(() => {});
  },
  cmd: 'mycolour',
  aliases: ['mycolors', 'mycolor', 'mycolours'],
};
