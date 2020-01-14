const { Command } = require('discord-akairo');

class KickCommand extends Command {
    constructor() {
        super('kick', {
            aliases: ['kick'],
            description: {
                content: 'Kicks a specific user',
                usage: 'kick <user>',
            },
            userPermissions: ['KICK_MEMBERS'],
            clientPermissions: ['KICK_MEMBERS'],
            channel: 'guild',
            args: [
                {
                    id: 'member',
                    type: 'member',
                    prompt: {
                        start: 'Who is the member you want to kick?',
                        retry: 'Invalid member. Try again!',
                    },
                },
                {
                    id: 'reason',
                    match: 'rest',
                    prompt: {
                        start: 'What is the reason for kicking?',
                        time: 120e3,
                    },
                },
            ],
        });
    }

    async exec(msg, { member, reason }) {
        if (member.kickable) {
            await member.kick(reason);
            await msg.util.send(
                `Succesfully kicked ${member.user.username} for the reason: \`${reason}\``,
            );
        } else {
            throw new Error('This user can\'t be kicked');
        }
    }
}

module.exports = KickCommand;
