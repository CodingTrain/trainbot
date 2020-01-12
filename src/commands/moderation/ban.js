const { Command } = require('discord-akairo');

class BanCommand extends Command {
    constructor() {
        super('ban', {
            aliases: ['ban'],
            description: {
                content: 'Bans a specific user',
                usage: 'ban <user>',
            },
            userPermissions: ['BAN_MEMBERS'],
            clientPermissions: ['BAN_MEMBERS'],
            channel: 'guild',
            args: [
                {
                    id: 'member',
                    type: 'member',
                    prompt: {
                        start: 'Who is the member you want to ban?',
                        retry: 'Invalid member. Try again!',
                    },
                },
                {
                    id: 'reason',
                    match: 'rest',
                    prompt: {
                        start: 'What is the reason for banning?',
                        time: 120e3,
                    },
                },
            ],
        });
    }

    async exec(msg, { member, reason }) {
        if (member.bannable) {
            await member.ban({ reason });
            await msg.channel.send(
                `Succesfully banned ${member.user.username} for the reason: \`${reason}\``,
            );
        } else {
            throw new Error('This user can\'t be banned');
        }
    }
}

module.exports = BanCommand;
