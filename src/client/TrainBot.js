const {
    AkairoClient,
    ListenerHandler,
    InhibitorHandler,
} = require('discord-akairo');
const { Collection } = require('discord.js');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const TrainCommandHandler = require('../structures/TrainCommandHandler');
const SettingsProvider = require('../structures/SettingsProvider');
const Logger = require('../util/logger');

const config = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', '..', 'config.json')),
);

class TrainBot extends AkairoClient {
    constructor() {
        super({ ownerID: config.ownerID });

        this.config = config;

        this.commandHandler = new TrainCommandHandler(this, {
            directory: path.join(__dirname, '..', 'commands/'),
            prefix: (msg) => {
                let prefix = this.settings.ready ? this.settings.get(null, 'prefix', this.config.prefix) : this.config.prefix;
                if (!msg || !msg.guild) return prefix;
                prefix = this.settings.get(msg.guild, 'prefix', this.config.prefix);
                return prefix;
            },
            allowMention: true,
            aliasReplacement: /-/g,
            commandUtil: true,
            handleEdits: true,
            commandUtilLifetime: 600000,
            defaultCooldown: 3000,
            automateCategories: true,
            argumentDefaults: {
                prompt: {
                    cancel: 'Command has been cancelled.',
                    ended: 'Too many retries, command has been cancelled.',
                    modifyRetry: (message, text) => `${message.member}, ${text}\n\nType \`cancel\` to cancel this command.`,
                    modifyStart: (message, text) => `${message.member}, ${text}\n\nType \`cancel\` to cancel this command.`,
                    retries: 3,
                    time: 30e3,
                    timeout: 'Time ran out, command has been cancelled',
                },
            },
        });

        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: path.join(__dirname, '..', 'inhibitors/'),
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: path.join(__dirname, '..', 'events/'),
        });

        this.logger = new Logger();

        this.blacklist = new Collection();

        this.db = null;

        this.settings = new SettingsProvider(this);
    }

    async init() {
        mongoose.set('useCreateIndex', true);

        await mongoose.connect(config.dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        this.logger.info('Connected to DB');

        this.db = mongoose.connection;

        this.db.on('error', this.logger.error);

        await this.settings.init();
        this.logger.info('Initialised settings');

        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.commandHandler.useListenerHandler(this.listenerHandler);

        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler,
        });

        this.commandHandler.loadAll();
        this.inhibitorHandler.loadAll();
        this.listenerHandler.loadAll();
    }

    async start() {
        await this.init();
        await this.login(this.config.token);
        return this;
    }
}

module.exports = TrainBot;
