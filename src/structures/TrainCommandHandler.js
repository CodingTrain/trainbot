const { CommandHandler } = require('discord-akairo');

class TrainCommandHandler extends CommandHandler {
    load(thing, isReload) {
        const command = super.load(thing, isReload);
        const err = this.checkCommand(command);
        if (err) this.client.logger.error(err);
    }

    checkCommand(cmd) {
        if (!cmd.hasOwnProperty('description')) return `The command ${cmd.id} doesn't have an description object.`;
        if (!cmd.description.hasOwnProperty('content') || !cmd.description.hasOwnProperty('usage')) {
            return `The command ${cmd.id} must have a content/usage key in its description object`;
        }
        return null;
    }
}

module.exports = TrainCommandHandler;
