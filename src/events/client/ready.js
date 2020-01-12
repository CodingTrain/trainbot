const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            category: 'client',
            emitter: 'client',
            event: 'ready',
        });
    }

    async exec() {
        this.client.logger.info(
            `${this.client.user.tag} is ready!
            -------------------------------
            ID: ${this.client.user.id}
            Currently in ${this.client.guilds.size} guild(s)
            Loaded ${this.client.commandHandler.modules.size} command(s) 🤖`,
        );

        await this.client.user.setPresence({
            activity: { name: 'Choo choo! I am trainbot.', type: 0 },
        });

        // Fetch messages that are to be used
        await this.client.channels
            .get(this.client.config.rulesChannel)
            .messages.fetch(this.client.config.rulesMessage);
    }
}

module.exports = ReadyListener;
