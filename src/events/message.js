const { emojis } = require('../constants');

exports.run = (bot, message) => {
    bot.commands.handleCommand(message);

    if (message.channel.id === bot.config.introductionsChannel) {
        message.react(emojis.ct_semicolon);
    }
};
