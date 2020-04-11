exports.run = async (bot, { message }, { id }) => {
    try {
        if (message.id === bot.config.rulesMessage) {
            await message.guild.members.resolve(id).roles.remove(bot.config.mutedRole);
        }
    } catch (err) {
        throw new Error(err);
    }
};
