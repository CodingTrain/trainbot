const { Command } = require('discord-akairo');
const path = require('path');

class ReloadCommand extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload'],
            description: {
                content: 'Reloads the given command',
                usage: 'reload <command>',
            },
            ownerOnly: true,
            args: [
                {
                    id: 'command',
                    type: 'commandAlias',
                    prompt: {
                        start: 'Which command would you like to reload?',
                        retry: 'Invalid command. Try again!',
                    },
                },
            ],
        });
    }

    exec(msg, { command }) {
        command.reload();
        msg.channel.send(`The command \`${command.id}\` has been reloaded`);
    }
}

module.exports = ReloadCommand;

exports.run = (bot, msg, args) => {
    if (args.length < 1) throw new Error('You must provide a command to reload');

    if (!bot.commands.has(args[0])) throw new Error(`The command ${args[0]} does not exist`);

    const cmdPath = bot.commands.get(args[0]).path;
    const relativePath = path.join('..', bot.commands.get(args[0]).path);
    delete require.cache[require.resolve(relativePath)];
    bot.commands.delete(args[0]);
    const cmd = require(relativePath);
    cmd.path = cmdPath;
    bot.commands.loadCommand(args[0], cmd);
    msg.channel.send(`The command \`${args[0]}\` has been reloaded`);
};
