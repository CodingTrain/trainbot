const { MessageCollector } = require('discord.js');
const { resolveUser } = require('../../utils');

exports.run = async (bot, msg, args) => {
    if(bot.blacklist.some(w=>msg.toLowerCase().include(w.toLowerCase()))){
      msg.delete(500);
      msg.channel.send(`${msg.author.toString()}, Please don't make use of obsene/discriminatory words! User ID ${msg.author.id}`)
    }
};
