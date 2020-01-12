const { Command } = require('discord-akairo');
// const { inspect } = require('util');

function clean(text) {
    if (typeof text === 'string') {
        return text
            .replace(/`/g, `\`${String.fromCharCode(8203)}`)
            .replace(/([`@#])/g, '$1\u200b');
    }
    return text;
}

class EvalCommand extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval'],
            description: {
                content: 'Evaluates JS code',
                usage: 'eval <code>',
            },
            ownerOnly: true,
            args: [
                {
                    id: 'code',
                    match: 'rest',
                },
            ],
        });
    }

    async exec(msg, { code }) {
        let output;
        try {
            // eslint-disable-next-line no-eval
            let evaled = await Promise.resolve(eval(code));
            if (typeof evaled !== 'string') {
                evaled = require('util').inspect(evaled);
            }

            msg.delete();
            output = clean(evaled).replace(
                new RegExp(this.client.token.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&'), 'g'), // For tokens with special characters
                'BOT_TOKEN',
            );

            msg.channel.send(
                `${msg.member} :mailbox:Input:\`\`\`js\n${code}\n\`\`\`\n:mailbox_with_mail:Output:\`\`\`js\n${output}\n\`\`\``,
            );
        } catch (err) {
            msg.delete();
            msg.channel.send(
                `${msg.member} :mailbox:Input:\`\`\`js\n${code}\n\`\`\`\n:mailbox_with_no_mail::cry:Output:\`\`\`\n${err}\n\`\`\``,
            );
        }
    }
}

module.exports = EvalCommand;
