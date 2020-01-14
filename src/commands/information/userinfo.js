const { Command } = require('discord-akairo');
const { Collection, MessageEmbed } = require('discord.js');
const formatDistanceToNow = require('date-fns/formatDistanceToNow');
const { commaListsAnd } = require('common-tags');
const { emojis } = require('../../util/constants');

class UserInfoCommand extends Command {
    constructor() {
        super('user-info', {
            aliases: ['user-info'],
            description: {
                content: 'Shows information about an user',
                usage: ['userinfo', 'userinfo <user>'],
            },
            channel: 'guild',
            args: [
                {
                    id: 'member',
                    type: 'member',
                    default: (msg) => msg.member,
                },
            ],
        });
    }

    exec(msg, { member }) {
        const status = {
            online: `User is online! ${emojis.photoblob}`,
            idle: `User is idle, probably drinking a cup of tea ${emojis.blobtea}`,
            offline: `User is offline, probably sleeping ${emojis.bloblseeping}`,
            dnd: `User doesn't want to be disturbed right now ${emojis.bloboutage}`,
        };
        const game = member.presence.activity
            ? member.presence.activity.name
            : 'Not playing a game';
        const createdAt = formatDistanceToNow(member.user.createdAt, {
            addSuffix: true,
        });
        const joinedAt = formatDistanceToNow(member.joinedAt, { addSuffix: true });
        let roles = 'This user has no special roles';
        let size = 0;
        if (member.roles.size !== 1) {
        // We don't use the @everyone role
            roles = new Collection(member.roles).filter(role => role.name !== '@everyone');
            ({ size } = roles);
            if (roles.size !== 1) {
                roles = commaListsAnd`${roles
                    .array()
                    .map(r => r.name)}`;
            } else {
                roles = roles.first().name;
            }
        }

        const embed = new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setTitle(`Information about ${member.displayName}`)
            .setDescription(status[member.presence.status])
            .addField('Username', member.user.username, true)
            .addField(`Playing... ${emojis.blobgamer}`, game, true)
            .addField('Account created', createdAt, true)
            .addField('Joined the server', joinedAt, true)
            .addField('ID', member.id, true)
            .addField(
                'Bot :robot:',
                member.user.bot ? 'Bleep bloop, I am a bot' : 'This person isn\'t a bot',
                true,
            )
            .addField(`Roles [${size}]`, `\`${roles}\``)
            .setFooter('Blobs provided by blobs.gg');
        msg.util.send(embed);
    }
}

module.exports = UserInfoCommand;
