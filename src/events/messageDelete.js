const { RichEmbed } = require('discord.js');

exports.run = (bot, msg) => {
    const embed = new RichEmbed()
        .setTitle(`Removed message in ${msg.channel}`)
        .setDescription(msg.content);

    bot.channels.get(bot.config.modLog).send(embed);
};
