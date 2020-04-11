const { MessageEmbed } = require('discord.js');

// eslint-disable-next-line consistent-return
exports.run = (bot, msg, args) => {
    if (args.length === 0) {
        const cmdsString = bot.commands.names
            .filter(cmd => !bot.commands.get(cmd).info.owner)
            .filter(cmd => {
                const perms = bot.commands.get(cmd).info.permissions;
                if (perms && !perms.every(e => !msg.member.hasPermission(e))) return true;
                if (!perms) return true;
                return false;
            })
            .filter(cmd => {
                const { roles } = bot.commands.get(cmd).info;
                if (!roles) return true;
                const roleCheck = roles.some(e => (
                    msg.member.roles.cache.find(role => role.name.toLowerCase() === e.toLowerCase())
                ));
                if (roles && roleCheck) {
                    return true;
                }
                return false;
            })
            .map(cmd => `\`${cmd}\``)
            .join(', ');
        msg.channel.send(
            `Available commands:\n${cmdsString}\n\ntip: use \`${bot.config.prefix}help <command>\` to get help about a specific command`,
        );
    } else if (args.length > 0) {
        if (!bot.commands.has(args[0])) throw new Error(`The command ${args[0]} isn't found.`);

        const { info } = bot.commands.get(args[0]);
        const { permissions } = info;
        const { roles } = info;
        if (permissions && permissions.some(e => !msg.member.hasPermission(e))) {
            return msg.channel.send('You\'re trying to ask for help for a command you don\'t have access to');
        }
        if (roles) {
            const roleCheck = roles.some(e => (
                msg.member.roles.cache.find(role => role.name.toLowerCase() === e.toLowerCase())
            ));
            if (!roleCheck) return msg.channel.send('You\'re trying to ask for help for a command you don\'t have access to');
        }

        let { usage } = info;
        if (Array.isArray(info.usage)) {
            usage = info.usage.map(el => bot.config.prefix + el).join('\n');
        } else {
            usage = bot.config.prefix + usage;
        }

        const embed = new MessageEmbed()
            .setTitle(info.name)
            .addField('Usage(s)', usage, true)
            .addField('Category', info.category, true)
            .setDescription(info.help);

        msg.channel.send(embed);
    }
};

exports.info = {
    name: 'help',
    usage: ['help', 'help <command>'],
    help: 'Gives all the current commands or the information about one command',
};
