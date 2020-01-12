const { MessageCollector } = require('discord.js');
const { resolveUser } = require('../../utils');

exports.run = async (bot, msg, args) => {
    if (args.length < 1) throw new Error('I need a user to ban');

    const user = resolveUser(msg, args.join(' '));
    if (!user) throw new Error(`The user ${args.join(' ')} couldn't be found`);

    if (user.bannable) {
        msg.channel.send('What is the reason for banning?');
        const collector = new MessageCollector(
            msg.channel,
            m => m.author === msg.author,
            { max: 1, time: 60000 },
        );
        await collector.on('collect', async m => {
            await user.ban(m.content);
            msg.channel.send(
                `Succesfully banned ${user.user.username} for the reason: \`${m.content}\``,
            );
            collector.stop();
        });

        await collector.on('end', async (collected, reason) => {
            if (reason === 'time') {
                msg.channel.send(
                    'The ban ended because you didn\'t provide a reason within 2 minutes.',
                );
            }
        });
    } else {
        throw new Error('This user can\'t be banned');
    }
};

exports.info = {
    name: 'ban',
    usage: 'ban <user>',
    help: 'Bans a specific user',
    permissions: ['BAN_MEMBERS'],
};
