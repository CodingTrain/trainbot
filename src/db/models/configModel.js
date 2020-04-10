const mongoose = require('mongoose');

const Snowflake = (error) => ({
    type: String,
    minlength: [18, 'A snowflake must be 18 characters long'],
    maxlength: [18, 'A snowflake must be 18 characters long'],
    required: [true, error],
});

const configSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, 'A configuration must have a name'],
    },
    prefix: {
        type: String,
        maxlength: [4, 'The prefix can\'t be longer than 4 characters'],
    },
    notificationRole: Snowflake('You must provide an ID for the notification role'),
    supporterRole: Snowflake('You must provide an ID for the supporter role'),
    modLog: Snowflake('You must provide an ID for the modlog channel'),
    rulesChannel: Snowflake('You must provide an ID for the rules channel'),
    rulesMessage: Snowflake('You must provide an ID for the rules message'),
    mutedRole: Snowflake('You must provide an ID for the muted role'),
    clasherRole: Snowflake('You must provide an ID for the clasher role'),
    clasherManagerRole: Snowflake('You must provide an ID for the clasher manager role'),
});

const Config = mongoose.model('Config', configSchema);

module.exports = Config;
