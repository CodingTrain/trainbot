const { RichEmbed } = require('discord.js');

exports.run = (bot, guild, user) => {
    const embed = new RichEmbed()
        .setTitle(`:police_officer: ${user.tag} was just banned from the server`);

    bot.channels.get(bot.config.modLog).send(embed);
};
