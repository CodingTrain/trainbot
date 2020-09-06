exports.run = (bot, message) => {
    bot.commands.handleReactions(message);
    bot.commands.handleCommand(message);
};
