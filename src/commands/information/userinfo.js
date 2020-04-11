const { MessageEmbed } = require('discord.js');
const formatDistanceToNow = require('date-fns/formatDistanceToNow');
const { resolveUser } = require('../../utils');
const { emojis } = require('../../constants');

exports.run = (bot, msg, args) => {
    let member = resolveUser(msg, args.join(' '));
    if (args.length === 0) ({ member } = msg);
    if (!member) throw new Error('This user can\'t be found.');

    const status = {
        online: `User is online! ${emojis.photoblob}`,
        idle: `User is idle, probably drinking a cup of tea ${emojis.blobtea}`,
        offline: `User is offline, probably sleeping ${emojis.bloblseeping}`,
        dnd: `User doesn't want to be disturbed right now ${emojis.bloboutage}`,
    };
    const game = member.presence.game
        ? member.presence.game.name
        : 'Not playing a game';
    const createdAt = formatDistanceToNow(member.user.createdAt, {
        addSuffix: true,
    });
    const joinedAt = formatDistanceToNow(member.joinedAt, { addSuffix: true });
    let roles = 'This user has no special roles';
    let size = 0;
    if (member.roles.size !== 1) {
    // We don't use the @everyone role
        roles = member.roles.cache.filter(role => role.name !== '@everyone');
        ({ size } = roles);
        if (roles.size !== 1) {
            roles = `${roles
                .array()
                .slice(0, -1)
                .map(r => r.name)
                .join(', ')} and ${roles.last().name}`;
        } else {
            roles = roles.first().name;
        }
    }

    const embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setThumbnail(member.user.displayAvatarURL())
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
    msg.channel.send(embed);
};

exports.info = {
    name: 'userinfo',
    usage: ['userinfo', 'userinfo <user>'],
    help: 'Shows information about an user',
};
