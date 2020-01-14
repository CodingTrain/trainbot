const stripIndents = require('../utils');

exports.run = (bot, member) => {
    member.addRole(bot.config.mutedRole);
    bot.channels.get(bot.config.welcomeChannel).send(stripIndents(`
        Welcome aboard ${member}! :steam_locomotive: Please read the full code of conduct in ${bot.channels.get(bot.config.rulesChannel)} 
        and react with an emoji at the end. This will unlock posting permission! Also, we want to learn more about you! Say hello using the template in ${bot.channels.get(bot.config.introductionsChannel)}
    `);
};
