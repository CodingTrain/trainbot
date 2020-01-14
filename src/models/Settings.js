const { model, Schema } = require('mongoose');

const SettingsSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    prefix: {
        type: String,
        default: '!',
    },
    notificationRole: {
        type: String,
        default: null,
    },
    rulesChannel: {
        type: String,
        default: null,
    },
    rulesMessage: {
        type: String,
        default: null,
    },
    mutedRole: {
        type: String,
        default: null,
    },
});

const Settings = model('Settings', SettingsSchema);

module.exports = { Settings, SettingsSchema };
