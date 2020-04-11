const { MessageEmbed } = require('discord.js');
const { emojis } = require('../constants');

exports.run = async (bot, msg) => {
    const embed = new MessageEmbed()
        .setDescription(`${emojis.redtick} New removed message from ${msg.member} in ${msg.channel}`)
        .addField('Message content', msg.content ? msg.content : 'This message had no content');

    if (msg.embeds.length > 0) {
        embed.addField('Embed', 'This message contained an embed which will be sent after this message');
    }

    await bot.channels.resolve(bot.config.modLog).send(embed);

    if (msg.embeds.length > 0) {
        bot.channels.resolve(bot.config.modLog).send('The deleted embed', { embed: msg.embeds[0] });
    }
};
