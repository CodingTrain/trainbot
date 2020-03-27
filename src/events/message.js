exports.run = (bot, message) => {
    const { prefix } = bot.config;
    if (!message.content.startsWith(prefix)) return;
    if(bot.blacklist.some(a=>message.content.toLowerCase().includes(a.toLowerCase()))){
        message.delete(500);//In case this is triggered before the message is actually sent, so that way there is no undeletable messages (I have experience with this problem)
        return message.channel.send(message.author.toString()+" Hi! Please don't make use of obscene/ discriminatory words, thanks!")
    }
    
    bot.commands.handleCommand(message);
};
