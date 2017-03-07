module.exports = {
  handler: (msg) => {
    const colors = msg.client.roleManager.colorsFromGuild(msg.guild);

    const roleMentions = colors.map(color => String(color)).join(' '.repeat(2));
    const timeToDelete = (20 + (colors.size * 1.5)) * 1000;
    const content =
`*Available colours in this server*.
Use \`bottie colour <colour name>\` to choose one
Colours amount in this server: \`${colors.size}\`\n
${roleMentions}`;

    msg.reply(content).then(m => m.delete(timeToDelete)).catch(console.log);
  },
  cmd: 'colours',
  aliases: ['colors'],
};
