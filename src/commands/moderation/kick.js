const { MessageCollector } = require('discord.js');
const { resolveUser } = require('../../utils');

exports.run = async (bot, msg, args) => {
    if (args.length < 1) throw new Error('I need a user to kick');

    const user = resolveUser(msg, args.join(' '));
    if (!user) throw new Error(`The user ${args.join(' ')} couldn't be found`);

    if (user.kickable) {
        msg.channel.send('What is the reason for kicking?');
        const collector = new MessageCollector(
            msg.channel,
            m => m.author === msg.author,
            { max: 1, time: 120000 },
        );
        await collector.on('collect', async m => {
            await user.kick(m.content);
            msg.channel.send(
                `Succesfully kicked ${user.user.username} for the reason: \`${m.content}\``,
            );
            collector.stop();
        });

        await collector.on('end', async (collected, reason) => {
            if (reason === 'time') {
                msg.channel.send(
                    'The kick ended because you didn\'t provide a reason within 2 minutes.',
                );
            }
        });
    } else {
        throw new Error('This user can\'t be kicked');
    }
};

exports.info = {
    name: 'kick',
    usage: 'kick <user>',
    help: 'Kicks a specific user',
    permissions: ['KICK_MEMBERS'],
};
