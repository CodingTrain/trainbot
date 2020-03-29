exports.run = (bot, message) => {
    const { prefix } = bot.config;

    bot.commands.handleCommand(message);
};
