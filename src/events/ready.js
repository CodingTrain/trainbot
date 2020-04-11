exports.run = bot => {
    bot.commands.loadCommands();

    bot.logger.info(
        `${bot.user.username}#${bot.user.discriminator} is ready!
        -------------------------------
        ID: ${bot.user.id}
        Currently in ${bot.guilds.cache.size} guild(s)
        Loaded ${bot.commands.size} command(s) 🤖`,
    );

    bot.user.setActivity('Choo, choo! I am Trainbot.', { type: 'PLAYING' });

    // Fetch messages that are to be used
    const channel = bot.channels
        .resolve(bot.config.rulesChannel);
    channel.messages.fetch(bot.config.rulesMessage);
};
