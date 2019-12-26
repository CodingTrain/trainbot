exports.run = (bot, message) => {
    const { prefix } = bot.config;
    if (!message.content.startsWith(prefix)) return;

    bot.commands.handleCommand(message);
};
