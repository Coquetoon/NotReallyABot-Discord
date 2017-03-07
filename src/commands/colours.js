module.exports = {
  handler: (msg) => {
    const colors = msg.client.roleManager.colorsFromGuild(msg.guild);

    const roleMentions = colors
                          .array()
                          .sort((a, b) => b.position - a.position)
                          .map(color => String(color));
    const timeToDelete = (20 + (colors.size * 1.5)) * 1000;
    const header =
`*Available colours in this server*.
Use \`bottie colour <colour name>\` to choose one
Colours amount in this server: \`${colors.size}\`\n`;

    if (roleMentions.length === 0) {
      msg.reply(header).then(m => m.delete(timeToDelete)).catch(console.log);
      return;
    }

    const roles = [];
    roleMentions[0] = header + roleMentions[0];

    while (roleMentions.length > 0) {
      roles.push(roleMentions.splice(0, 70));
    }

    roles.forEach((role) => {
      const content = role.join(' '.repeat(3));
      msg.reply(content).then(m => m.delete(timeToDelete)).catch(console.log);
    });
  },
  cmd: 'colours',
  aliases: ['colors'],
};
