const { stripIndents } = require('../../utils');

exports.run = async (bot, msg) => {
    const m = await msg.channel.send('Pong!');
    m.edit(
        stripIndents(
            `Pong!
        Time taken: ${m.createdTimestamp - msg.createdTimestamp}ms :timer:
        Heartbeat ping: ${Math.floor(bot.ws.ping)}ms :heartbeat:`,
        ),
    );
};

exports.info = {
    name: 'ping',
    usage: 'ping',
    help: 'Gives back the round-trip time and heartbeat ping of the bot',
};
