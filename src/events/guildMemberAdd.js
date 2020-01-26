const stripIndents = require('../utils');

exports.run = (bot, member) => {
    member.addRole(bot.config.mutedRole);
    bot.channels.get(bot.config.welcomeChannel).send(stripIndents(`
        Welcome aboard ${member}! :steam_locomotive: Please read the Code of Conduct and other welcome messages in ${bot.channels.get(bot.config.rulesChannel)} 
        and react with an emoji. This will unlock posting permission! Also, the community would love to learn more about you! Introduce yourself with the template in ${bot.channels.get(bot.config.introductionsChannel)}
    `));
};
