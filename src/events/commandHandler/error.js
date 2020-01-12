const { Listener } = require('discord-akairo');

class CommandHandlerErrorListenener extends Listener {
    constructor() {
        super('commandHandlerError', {
            category: 'commandHandler',
            emitter: 'commandHandler',
            event: 'error',
        });
    }

    async exec(error, message) {
        const m = await message.channel.send(`:x: ${error}`);
        await m.delete({ timeout: 5e3 });
    }
}

module.exports = CommandHandlerErrorListenener;
