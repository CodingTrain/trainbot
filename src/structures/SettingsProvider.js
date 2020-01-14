const { Provider } = require('discord-akairo');
const { Guild } = require('discord.js');
const { Settings } = require('../models/Settings');

class SettingsProvider extends Provider {
    constructor(client) {
        super();
        this.client = client;
        this.ready = false;
    }

    async init() {
        const settings = await Settings.find({});
        if (!settings.length) {
            const global = await Settings.create({ id: '0', prefix: this.client.config.prefix });
            settings.push(global);
        }

        for (const item of settings.values()) {
            this.items.set(item.id, item);
        }

        this.ready = true;
    }

    get(guild, key, defaultValue) {
        const id = SettingsProvider.resolveGuild(guild);
        if (this.items.has(id)) {
            const value = this.items.get(id)[key];
            return value || defaultValue;
        }
        return defaultValue;
    }

    async set(guild, key, value) {
        const id = SettingsProvider.resolveGuild(guild);
        const data = this.items.get(id) || { id };
        data[key] = value;
        this.items.set(id, data);

        await Settings.updateOne({ id }, data, { upsert: true });

        return data;
    }

    async delete(guild, key) {
        const id = SettingsProvider.resolveGuild(guild);
        const data = this.items.get(id) || { id };
        delete data[key];
        this.items.set(id, data);

        await Settings.updateOne({ id }, data, { upsert: true });

        return data;
    }

    async clear(guild) {
        const id = SettingsProvider.resolveGuild(guild);
        this.items.delete(id);

        const res = await Settings.deleteOne({ id });
        return res;
    }

    static resolveGuild(guild) {
        if (guild instanceof Guild) return guild.id;
        if (guild === 'global' || guild === null) return '0';
        if (typeof guild === 'string' && /^\d+$/.test(guild)) return guild;
        throw new TypeError('Invalid guild specified. Must be a Guild instance, guild ID, "global", or null.');
    }
}

module.exports = SettingsProvider;
