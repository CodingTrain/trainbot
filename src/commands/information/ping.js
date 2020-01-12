const { Command } = require('discord-akairo');
const { stripIndents } = require('common-tags');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            description: {
                content: 'Gives back the round-trip time and heartbeat ping of the bot',
                usage: 'ping',
            },
        });
    }

    async exec(msg) {
        const m = await msg.channel.send('Pong!');
        m.edit(
            stripIndents(
                `Pong!
                Time taken: ${m.createdTimestamp - msg.createdTimestamp}ms :timer:
                Heartbeat ping: ${this.client.ws.ping}ms :heartbeat:`,
            ),
        );
    }
}

module.exports = PingCommand;
