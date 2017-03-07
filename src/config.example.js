module.exports = {
  // Prefix of the command
  command: {
    prefix: 'bottie',
    config: {
      separateBySpace: true,
    },
  },
  // Game
  game: 'I am not a bot!',
  // Messages displayed on the console by the bot upon ready.
  onReadyConsoleMessage: 'Ready.',

  // Should I ignore the handling of my own messages?
  ignoringMyself: true,

  roles: {
    colour: {
      prefixes: [
        '#',
        '+',
      ],
    },
  },

  bot: {
    // Owners of the bot. Insert the ID
    owners: [
      'id',
    ],

    onReady: {
      // Message sent on a chat room when ready.
      sendMessages: [
        {
          channel: 'textChannel id',
          message: 'Ready to be a bot',
        },
      ],
    },
  },
};
