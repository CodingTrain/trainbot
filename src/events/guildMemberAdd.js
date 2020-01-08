const { stripIndents } = require('../utils');
const constants = require('../constants');

exports.run = (bot, member) => {
    const channel = member.guild.channels.get(bot.config.welcomeChannel);
    channel.send(
        stripIndents(`
        Choo, choo! Welcome on board of the Coding Train ${member}. We are happy to have you here! ${constants.ct_asterisk}
        To see which rules we have here, please read the <#${bot.config.rulesChannel}>.
    `),
    );
};
