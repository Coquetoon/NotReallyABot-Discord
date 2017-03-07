const NotReallyABot = require('./bot/NotReallyABot');
const Token = require('./.token.json');
const CONFIG = require('./config');

// Bottie client
const Bottie = new NotReallyABot(CONFIG);

Bottie.on('ready', function onReady() {
  const config = this.config;
  const me = this.user;

  console.log(config.onReadyConsoleMessage); // eslint-disable-line no-console
  // Change game to the one set in the config file
  me.setGame(config.game);

  config.bot.onReady.sendMessages.forEach((msg) => {
    const channel = this.channels.get(msg.channel);
    if (channel && channel.permissionsFor(me).hasPermission('SEND_MESSAGES')) {
      channel.sendMessage(msg.content);
    }
  });

  this.guilds.forEach(guild => this.roleManager.addGuild(guild));
});

Bottie.on('message', function onMessage(msg) {
  const client = msg.client;

  if (msg.author === client.user && client.config.ignoringMyself) return;

  this.commandManager.parser.makeAnswer(msg)
    .then((answer) => {
      if (!answer.command) {
        msg.reply(`I don't know what \`${answer.commandName}\` means :(`);
        return;
      }

      answer.executeCommand().catch(console.log);
    })
    .catch(console.log);
});

Bottie.on('guildCreate', function onGuildCreate(guild) {
  this.roleManager.addGuild(guild);
});

Bottie.on('guildDelete', function onGuildDelete(guild) {
  this.roleManager.deleteGuild(guild);
});

Bottie.on('roleCreate', function onRoleCreate(role) {
  const roleManager = this.roleManager;
  if (roleManager.isColorRole(role)) {
    roleManager.setRole(role);
  }
});

Bottie.on('roleDelete', function onRoleDelete(role) {
  this.roleManager.deleteRole(role);
});

Bottie.on('roleUpdate', function onRoleUpdate(oldRole, newRole) {
  this.roleManager.updateRole(oldRole, newRole);
});

Bottie.login(Token ? Token.token : process.env.NOTREALLYABOT_TOKEN);
