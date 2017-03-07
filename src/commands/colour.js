module.exports = {
  handler: (msg, answer) => {
    if (msg.guild === undefined) return;

    const colorName = answer.rawArguments;

    if (colorName === '') {
      msg.reply('You must specify a colour. Use `bottie colours` to get a list of them.');
      return;
    }

    const client = msg.client;
    const role = client.roleManager.getRoleByName(msg.guild, colorName);

    if (!role) {
      msg.reply(`The colour \`${colorName}\` does not exist!`);
      return;
    }

    msg.member.addRole(role)
      .then((member) => {
        msg.reply(`Enjoy your new colour ${role}!`);

        setTimeout(() => {
          const colorRoles = client.roleManager.filterColorRoles(member.roles, role);
          if (colorRoles.size === 0) return;

          member.removeRoles(colorRoles)
            .catch(e => msg.reply(`I couldn't remove your old colours. Reason: ${e}`));
        }, 500);
      })
      .catch((error) => {
        msg.reply(`I couldn't give you the colour ${role}! Maybe I don't have permissions to manage that role.\n${error}`);
      });
  },
  cmd: 'colour',
  aliases: ['color'],
  args: ['colour name'],
};
