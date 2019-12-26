exports.run = (bot) => {
    bot.commands.loadCommands();

    bot.logger.info(
        `${bot.user.username}#${bot.user.discriminator} is ready!
        -------------------------------
        ID: ${bot.user.id}
        Currently in ${bot.guilds.size} guild(s)
        Loaded ${bot.commands.size} command(s) 🤖`,
    );

    bot.user.setPresence({ game: { name: 'Choo choo! I am trainbot.', type: 0 } });
};
