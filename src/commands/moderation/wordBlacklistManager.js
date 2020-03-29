const { MessageCollector } = require('discord.js');
const { resolveUser } = require('../../utils');

exports.run = async (bot, msg, args) => {
    if(bot.wBlacklist.some(w=>msg.toLowerCase().include(w.toLowerCase()))){
      msg.delete(500);
      msg.channel.send(`${msg.author.toString()}, Please don't make use of obsene/discriminatory words!`)//To find how many warnings, search "mentions: [user] by:trainbot" using discord search
    }
};
