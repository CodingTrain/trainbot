const { Argument, Command } = require('discord-akairo');

class PruneCommand extends Command {
    constructor() {
        super('prune', {
            aliases: ['prune'],
            description: {
                content: 'Prunes a specific amount of messages',
                usage: 'prune <number of messages>',
            },
            userPermissions: ['MANAGE_MESSAGES'],
            clientPermissions: ['MANAGE_MESSAGES'],
            channel: 'guild',
            args: [
                {
                    id: 'amount',
                    type: Argument.range('integer', 0, 50, true),
                    prompt: {
                        start: 'What is the amount of messages to prune? (max 50)',
                        retry: 'Invalid amount. Try again. (max 50)',
                    },
                },
            ],
        });
    }

    async exec(msg, { amount }) {
        const messages = await msg.channel.messages.fetch({ limit: amount });

        for (const msgToDelete of messages.values()) {
            if (msgToDelete.deletable) {
                msgToDelete.delete();
            } else {
                msg.channel.send(
                    `The following message is not deletable by me\n>>> ${msgToDelete.content}`,
                );
            }
        }
    }
}

module.exports = PruneCommand;
