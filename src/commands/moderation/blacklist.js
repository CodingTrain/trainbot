const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class BlacklistCommand extends Command {
    constructor() {
        super('blacklist', {
            aliases: ['blacklist'],
            description: {
                content: 'Blacklists someone from using the bot',
                usage: ['blacklist', 'blacklist add <user>', 'blacklist remove <user>'],
            },
            ownerOnly: true,
            channel: 'guild',
        });
    }

    * args() {
        const method = yield {
            type: ['list', 'add', 'remove'],
            default: 'list',
        };

        let member = null;

        if (method !== 'list') {
            member = yield {
                type: 'member',
                prompt: {
                    start: `Who is the member you to ${method === 'add' ? 'add to' : 'remove from'} the blacklist?`,
                    retry: 'Invalid member. Try again!',
                },
            };
        }

        return { method, member };
    }

    exec(msg, { method, member }) {
        if (method === 'list') {
            const list = this.client.blacklist.keyArray()
                .map(user => `- ${this.client.blacklist.get(user)} (${user})`)
                .join('\n');
            const embed = new MessageEmbed()
                .setTitle('The Blacklist')
                .setDescription('A list of people who are forbidden from using the bot')
                .addField('List', list.length !== 0 ? list : 'There are no people on the blacklist');
            msg.channel.send(embed);
        } else if (method === 'add') {
            this.client.blacklist.set(member.id, member.user.username);
            msg.channel.send(`Succesfully added ${member.user.username} to the blacklist`);
        } else if (method === 'remove') {
            this.client.blacklist.delete(member.id);
            msg.channel.send(`Succesfully removed ${member.user.username} from the blacklist`);
        }
    }
}

module.exports = BlacklistCommand;
