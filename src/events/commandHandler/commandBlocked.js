/* eslint-disable no-else-return */
const { Listener } = require('discord-akairo');

class CommandBlockedListener extends Listener {
    constructor() {
        super('commandBlocked', {
            category: 'commandHandler',
            emitter: 'commandHandler',
            event: 'commandBlocked',
        });
    }

    exec(message, command, reason) {
        if (reason === 'guild') {
            return message.reply(
                `Command \`${command.id}\` is only accessable in servers`,
            );
        } else if (reason === 'dm') {
            return message.reply(
                `Command \`${command.id}\` is only accessable in DMs`,
            );
        } else if (reason === 'owner') {
            return message.reply(
                `Command \`${command.id}\` is only accessable by the bot owner(s)`,
            );
        } else if (reason === 'blacklist') {
            // return message.reply(`You are blacklisted...`);
            return null;
        }
        return this.client.logger.info(
            `${message.author.username} was blocked from using ${
                command.id
            } because of ${reason}!`,
        );
    }
}

module.exports = CommandBlockedListener;
