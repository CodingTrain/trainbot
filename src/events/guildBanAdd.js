const { MessageEmbed } = require('discord.js');

exports.run = (bot, guild, user) => {
    const embed = new MessageEmbed()
        .setTitle(`:police_officer: ${user.tag} was just banned from the server`);

    bot.channels.resolve(bot.config.modLog).send(embed);
};
