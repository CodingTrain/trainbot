const { stripIndents } = require('../utils');

exports.run = (bot, member) => {
    member.roles.add(bot.config.mutedRole);
    bot.channels.resolve(bot.config.welcomeChannel).send(stripIndents(`
        Welcome aboard ${member}! :steam_locomotive: Please read the Code of Conduct and other welcome messages in ${bot.channels.resolve(bot.config.rulesChannel)} 
        and react with an emoji. This will unlock posting permission! Also, the community would love to learn more about you! Introduce yourself with the template in ${bot.channels.resolve(bot.config.introductionsChannel)}
    `));
};
