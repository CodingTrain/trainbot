const { Listener } = require('discord-akairo');

class GuildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            category: 'client',
            emitter: 'client',
            event: 'guildMemberAdd',
        });
    }

    exec(member) {
        member.roles.add(this.client.config.mutedRole);
    }
}

module.exports = GuildMemberAddListener;
