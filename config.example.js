const Config = {};

// Prefix of the command
Config.prefix = 'COMMAND PREFIX';
// Should I ignore the handling of my own messages?
Config.ignoringMyself = true;
// Game
Config.game = undefined;
// Messages displayes by the bot upon ready.
// Message showed on console.
Config.readyConsole = 'Ready.';
// Message showed on a chat room.
Config.ready = [
    {
        'id': 'textChannel id',
        'message': 'Ready to be a bot',
    },
];

// Owners of the bot
Config.masters = [
    'id',
];

module.exports = Config;
