const { RichEmbed } = require('discord.js');

exports.run = (bot, member) => {
    const embed = new RichEmbed()
        .setTitle(`:door: ${member.user.tag} just left the server`);

    bot.channels.get(bot.config.modLog).send(embed);
};
