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
        msg.util.send(`The command \`${command.id}\` has been reloaded`);
    }
}

module.exports = ReloadCommand;
