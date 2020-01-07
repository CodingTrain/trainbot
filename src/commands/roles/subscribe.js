exports.run = async (bot, msg, args) => {
    try {
        const { member } = msg;
        console.log(bot.config.notificationRole);
        if (member.roles.has(bot.config.notificationRole)) {
            await member.removeRole(bot.config.notificationRole);
            msg.channel.send('Removed role! You won\'t be notified anymore');
        } else {
            await member.addRole(bot.config.notificationRole);
            msg.channel.send('Added role! You will now be notified');
        }
    } catch (err) {
        throw new Error('Role could not be added!');
    }
};

exports.info = {
    name: 'subscribe',
    usage: 'subscribe',
    help:
    'This command subscribes you to notifications about the live streams or videos, running this if you have the role should remove it',
};
