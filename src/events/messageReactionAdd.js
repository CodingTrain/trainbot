exports.run = async (bot, { message }, { id }) => {
    try {
        if (message.id === bot.config.rulesMessage) {
            await message.guild.members.get(id).removeRole(bot.config.mutedRole);
        }
    } catch (err) {
        throw new Error(err);
    }
};
