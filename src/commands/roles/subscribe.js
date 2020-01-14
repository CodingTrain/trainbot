const { Command } = require('discord-akairo');

class SubscribeCommand extends Command {
    constructor() {
        super('subscribe', {
            aliases: ['subscribe'],
            description: {
                content: 'This command subscribes you to notifications about the live streams or videos, running this if you have the role should remove it',
                usage: 'subscribe',
            },
            clientPermissions: ['MANAGE_ROLES'],
            channel: 'guild',
        });
    }

    async exec(msg) {
        try {
            const { member } = msg;
            if (member.roles.has(this.client.config.notificationRole)) {
                await member.roles.remove(this.client.config.notificationRole);
                msg.util.send('Removed role! You won\'t be notified anymore');
            } else {
                await member.roles.add(this.client.config.notificationRole);
                msg.util.send('Added role! You will now be notified');
            }
        } catch (err) {
            console.error(err);
            throw new Error('Role could not be added!');
        }
    }
}

module.exports = SubscribeCommand;
