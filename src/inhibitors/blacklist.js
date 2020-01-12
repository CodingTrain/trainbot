const { Inhibitor } = require('discord-akairo');

class BlacklistInhibitor extends Inhibitor {
    constructor() {
        super('blacklist', {
            reason: 'blacklist',
        });
    }

    exec(message) {
        return this.client.blacklist.has(message.author.id);
    }
}

module.exports = BlacklistInhibitor;
