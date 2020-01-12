const { Listener } = require('discord-akairo');

class MessageReactionAddListener extends Listener {
    constructor() {
        super('messageReactionAdd', {
            category: 'client',
            emitter: 'client',
            event: 'messageReactionAdd',
        });
    }

    async exec({ message }, user) {
        try {
            if (message.id === this.client.config.rulesMessage) {
                await message.guild.member(user).roles.remove(this.client.config.mutedRole);
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = MessageReactionAddListener;
