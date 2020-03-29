const { inspect } = require('util');

function clean(text) {
    if (typeof text === 'string') {
        return text
            .replace(/`/g, `\`${String.fromCharCode(8203)}`)
            .replace(/([`@#])/g, '$1\u200b');
    }
    return text;
}

exports.run = async (bot, msg, args) => {
    const code = args.join(' ');
    let output;
    try {
        // eslint-disable-next-line no-eval
        let evaled = await Promise.resolve(eval(code));
        if (typeof evaled !== 'string') {
            evaled = inspect(evaled);
        }

        msg.delete();
        output = clean(evaled).replace(
            new RegExp(bot.token.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&'), 'g'), // For tokens with special characters
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
};

exports.info = {
    name: 'eval',
    usage: 'eval <code>',
    help: 'Evaluates JS code',
    owner: true,
};
