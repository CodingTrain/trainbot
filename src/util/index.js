exports.stripIndents = string => string.replace(/^[ \\t]+/gm, '');

exports.resolveUser = (msg, username) => {
    if (/<@!?\d+>/g.test(username)) {
        return msg.guild.members.get(msg.mentions.users.first().id);
    }
    if (msg.guild.members.has(username)) {
        return msg.guild.members.get(username);
    }
    if (/(.*)#(\d{4})/g.test(username)) {
        return msg.guild.members.find(member => member.user.tag === username);
    }
    if (msg.guild.members.find(member => member.nickname === username)) {
        return msg.guild.members.find(member => member.nickname === username);
    }
    if (msg.guild.members.find(member => member.user.username === username)) {
        return msg.guild.members.find(member => member.user.username === username);
    }
    if (msg.guild.members.find(member => member.id === username)) {
        return msg.guild.members.find(member => member.id === username);
    }
    return null;
};

exports.capitalize = (str) => (
    str.charAt(0).toUpperCase() + str
        .slice(1)
        .toString()
        .toLowerCase()
);
