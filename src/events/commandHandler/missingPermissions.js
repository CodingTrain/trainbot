const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

const PERMISSIONS = {
    ADMINISTRATOR: 'Administrator',
    VIEW_AUDIT_LOG: 'View audit log',
    MANAGE_GUILD: 'Manage server',
    MANAGE_ROLES: 'Manage roles',
    MANAGE_CHANNELS: 'Manage channels',
    KICK_MEMBERS: 'Kick members',
    BAN_MEMBERS: 'Ban members',
    CREATE_INSTANT_INVITE: 'Create instant invite',
    CHANGE_NICKNAME: 'Change nickname',
    MANAGE_NICKNAMES: 'Manage nicknames',
    MANAGE_EMOJIS: 'Manage emojis',
    MANAGE_WEBHOOKS: 'Manage webhooks',
    VIEW_CHANNEL: 'Read text channels and see voice channels',
    SEND_MESSAGES: 'Send messages',
    SEND_TTS_MESSAGES: 'Send TTS messages',
    MANAGE_MESSAGES: 'Manage messages',
    EMBED_LINKS: 'Embed links',
    ATTACH_FILES: 'Attach files',
    READ_MESSAGE_HISTORY: 'Read message history',
    MENTION_EVERYONE: 'Mention everyone',
    USE_EXTERNAL_EMOJIS: 'Use external emojis',
    ADD_REACTIONS: 'Add reactions',
    CONNECT: 'Connect',
    SPEAK: 'Speak',
    MUTE_MEMBERS: 'Mute members',
    DEAFEN_MEMBERS: 'Deafen members',
    MOVE_MEMBERS: 'Move members',
    USE_VAD: 'Use voice activity',
};

class MissingPermissionsListener extends Listener {
    constructor() {
        super('missingPermissions', {
            category: 'commandHandler',
            emitter: 'commandHandler',
            event: 'missingPermissions',
        });
    }

    exec(message, _, type, missingPerms) {
        const mappedPerms = missingPerms.map(p => `• ${PERMISSIONS[p] || p}`);

        if (type === 'client') {
            const embed = new MessageEmbed()
                .setTitle('Missing Permission(s)')
                .setDescription(`I'm missing the following permission(s):\n\n${mappedPerms.join('\n')}`);

            message.channel.send(embed);
        } else if (type === 'user') {
            const embed = new MessageEmbed()
                .setTitle('Missing Permission(s)')
                .setDescription(`You are missing the following permission(s):\n\n${mappedPerms.join('\n')}`);

            message.channel.send(embed);
        }
    }
}

module.exports = MissingPermissionsListener;
