const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const Commands = require('./managers/commands');
const Logger = require('./managers/logger');

const bot = new Discord.Client();
const config = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'config.json')),
);

bot.config = config;
bot.commands = new Commands(bot);
bot.logger = new Logger();
bot.blacklist = fs.readFileSync("./blacklist.txt","UTF-8").split('\n');

const events = fs.readdirSync(path.join(__dirname, 'events'));
for (const event of events) {
    const name = event.split('.')[0];
    const eventFunc = require(path.join(__dirname, 'events', name));
    bot.on(name, (...args) => eventFunc.run(bot, ...args));
}
bot.on('message',message=>{
    if(bot.blacklist.some(a=>message.content.includes(a))){
        message.delete(500);//In case this is triggered before the message is actually sent, so that way there is no undeletable messages (I have experience with this problem)
        message.channel.send(message.author.toString()+" Hi! Please don't make use of obscene/ discriminatory words, thanks!")
    }
})
bot.login(config.token);
