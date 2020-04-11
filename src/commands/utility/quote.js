const { MessageEmbed } = require('discord.js');

exports.run = async (bot, msg, args) => {
    if (args.length < 2) throw new Error('I need the ID of the channel and the ID of the message to quote');

    const channel = msg.mentions.channels.first();
    const fetchedMessage = await channel.messages.fetch(args[1]);
    const embed = new MessageEmbed()
        .setTitle(`Message quoted from ${channel.name}`)
        .setAuthor(fetchedMessage.author.tag)
        .setDescription(fetchedMessage.content)
        .addField('Link', `[Jump to message](${fetchedMessage.url})`);
    msg.delete();
    msg.channel.send(embed);
};

exports.info = {
    name: 'quote',
    usage: 'quote <channel> <message>',
    help: 'Quotes a message',
    roles: ['Dispatcher', 'Signal Maintainer'],
};
