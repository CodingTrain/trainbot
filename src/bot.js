const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Commands = require('./managers/commands');
const Logger = require('./managers/logger');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
}).then(() => console.log('DB connection successful!'));

const bot = new Discord.Client();
const config = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'config.json')),
);

bot.config = config;
bot.commands = new Commands(bot);
bot.logger = new Logger();
bot.blacklist = new Discord.Collection();

const events = fs.readdirSync(path.join(__dirname, 'events'));
for (const event of events) {
    const name = event.split('.')[0];
    const eventFunc = require(path.join(__dirname, 'events', name));
    bot.on(name, (...args) => eventFunc.run(bot, ...args));
}
bot.login(config.token);
