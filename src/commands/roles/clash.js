const { MessageEmbed } = require('discord.js');

exports.run = async (bot, msg, args) => {
    const { member } = msg;
    if (args.length === 0 || args[0] === 'subscribe') {
        if (member.roles.cache.has(bot.config.clasherRole)) {
            await member.roles.remove(bot.config.clasherRole);
            msg.channel.send('Removed code clasher role! You won\'t be for code clashes anymore.');
        } else {
            await member.roles.add(bot.config.clasherRole);
            msg.channel.send('Added code clasher role! You will be notified for code clashes now.');
        }
    } else if (args[0] === 'ping') {
        if (member.roles.cache.has(bot.config.clasherManager)) {
            if (!args[1]) throw new Error('You need a link to a Clash of Code game');
            const embed = new MessageEmbed()
                .setTitle(`${msg.author.username} has issued a ping for the Clashers`)
                .setDescription(`A new game is starting at ${args[1]}`);

            msg.guild.roles.resolve(bot.config.clasherRole).setMentionable(true);
            await msg.channel.send(`<@&${bot.config.clasherRole}>`);
            msg.guild.roles.resolve(bot.config.clasherRole).setMentionable(false);
            await msg.channel.send(embed);
            await msg.delete();
        } else {
            throw new Error('You don\'t have sufficient permissions to ping this role');
        }
    }
};

exports.info = {
    name: 'clash',
    usage: 'clash (subscribe)',
    help: 'Subscribing yourself to join code clashes',
};
