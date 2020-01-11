exports.run = (bot, member) => {
    member.addRole(bot.config.mutedRole);
};
