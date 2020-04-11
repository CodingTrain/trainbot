const { MessageEmbed } = require('discord.js');
const { resolveUser } = require('../../utils');

exports.run = (bot, msg, args) => {
    if (args.length === 0) {
        const list = bot.blacklist.keyArray()
            .map(user => `- ${bot.blacklist.get(user)} (${user})`)
            .join('\n');
        const embed = new MessageEmbed()
            .setTitle('The Blacklist')
            .setDescription('A list of people who are forbidden from using the bot')
            .addField('List', list.length !== 0 ? list : 'There are no people on the blacklist');
        msg.channel.send(embed);
    } else if (args[0] === 'add') {
        if (!args[1]) throw new Error('Please provide an user to add to the blacklist');

        const user = resolveUser(msg, args[1]);
        if (user) {
            bot.blacklist.set(user.id, user.user.username);
            msg.channel.send(`Succesfully added ${user.user.username} to the blacklist`);
        } else {
            throw new Error(`Couldn't find the user ${args[1]}`);
        }
    } else if (args[0] === 'remove') {
        if (!args[1]) throw new Error('Please provide an user to remove from the blacklist');

        const user = resolveUser(msg, args[1]);
        if (user) {
            if (bot.blacklist.has(user.id)) {
                bot.blacklist.delete(user.id);
                msg.channel.send(`Succesfully removed ${user.user.username} from the blacklist`);
            } else {
                throw new Error(`${user.user.username} isn't in the blacklist`);
            }
        }
    } else {
        throw new Error('Please provide a valid subcommand');
    }
};

exports.info = {
    name: 'blacklist',
    usage: ['blacklist', 'blacklist add <user>', 'blacklist remove <user>'],
    help: 'Blacklists someone from using the bot',
    owner: true,
};
