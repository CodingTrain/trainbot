const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { capitalize } = require('../../util');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            description: {
                content: 'Gives all the current commands or the information about one command',
                usage: ['help', 'help <command>'],
            },
            args: [
                {
                    id: 'command',
                    type: 'commandAlias',
                    default: null,
                },
            ],
        });
    }

    exec(msg, { command }) {
        if (!command) {
            const cmdsString = this.handler.modules
                .filter(cmd => !cmd.ownerOnly)
                .filter(cmd => {
                    const perms = cmd.userPermissions;
                    if (typeof perms === 'function') {
                        return !perms(msg);
                    }
                    if (perms && !perms.every(e => !msg.member.permissions.has(e))) return true;
                    if (!perms) return true;
                    return false;
                })
                .map(cmd => `\`${cmd}\``)
                .join(', ');
            msg.util.send(
                stripIndents`Available commands:
                ${cmdsString}
                
                tip: use \`${this.handler.prefix}help <command>\` to get help about a specific command`,
            );
        } else {
            const info = command.description;

            let { usage } = info;
            if (Array.isArray(command.description.usage)) {
                usage = info.usage.map(el => this.handler.prefix + el).join('\n');
            } else {
                usage = this.handler.prefix + usage;
            }

            const embed = new MessageEmbed()
                .setTitle(command.id)
                .addField('Usage(s)', usage, true)
                .addField('Category', capitalize(info.category), true)
                .setDescription(info.content);

            msg.util.send(embed);
        }
    }
}

module.exports = HelpCommand;
