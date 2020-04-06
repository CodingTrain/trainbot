const { MessageCollector } = require('discord.js');

exports.run = async (bot, msg, args) => {
    if (args.length === 0) {
        msg.channel.send('Do you want it to be a yes/no question? (y/n)');
        const collector = new MessageCollector(msg.channel, m => m.author === msg.author, { max: 1, time: 60000 });
        await collector.on('collect', async m => {
            if (msg.content.toLowerCase().startsWith('y')) {
                // Do yes/no question stuff
            } else if (msg.content.toLowerCase().startsWith('n')) {
                // Do general question stuff
            } else {
                msg.channel.send('Please type yes or no');
                // Restart the collector
            }
        });
    }
};

exports.info = {
    name: 'poll',
    usage: 'poll <question> | (option1) | (option2) | (option3)',
    help: 'Creates a poll that people can react on, use without args for an interactive setup, or use shortcut',
    roles: ['Conductor', 'Dispatcher', 'Station Manager'],
};
