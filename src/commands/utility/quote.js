const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class QuoteCommand extends Command {
    constructor() {
        super('quote', {
            aliases: ['quote'],
            description: {
                help: 'Quotes a message',
                usage: 'quote <channel> <message>',
            },
            channel: 'guild',
        });
    }

    userPermissions(message) {
        if (!message.member.roles.some(r => r.name === 'Signal Maintainer')) return 'Signal Maintainer';
        return null;
    }

    async* args() {
        const channel = yield {
            type: 'textChannel',
            prompt: {
                start: 'What is the text channel?',
                retry: 'Invalid text channel. Try again.',
            },
        };

        const fetchedMessage = yield {
            type: async (_, phrase) => {
                if (!/[0-9]{17,19}/.test(phrase)) return null;
                try {
                    const msg = await channel.messages.fetch(phrase);
                    return msg;
                } catch (error) {
                    return null;
                }
            },
            prompt: {
                start: 'What is the message ID?',
                retry: 'Invalid message ID. Try again.',
            },
        };

        return { channel, fetchedMessage };
    }

    async exec(msg, { fetchedMessage }) {
        const embed = new MessageEmbed()
            .setTitle(`Message quoted from ${fetchedMessage.channel.name}`)
            .setAuthor(fetchedMessage.author.tag)
            .setDescription(fetchedMessage.content)
            .addField('Link', `[Jump to message](${fetchedMessage.url})`);
        msg.util.send(embed);
    }
}

module.exports = QuoteCommand;
