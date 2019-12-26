const path = require('path');

exports.run = (bot, msg, args) => {
    if (args.length < 1) throw new Error('You must provide a command to reload');

    if (!bot.commands.has(args[0])) throw new Error(`The command ${args[0]} does not exist`);

    const cmdPath = bot.commands.get(args[0]).path;
    const relativePath = path.join('..', bot.commands.get(args[0]).path);
    delete require.cache[require.resolve(relativePath)];
    bot.commands.delete(args[0]);
    const cmd = require(relativePath);
    cmd.path = cmdPath;
    bot.commands.loadCommand(args[0], cmd);
    msg.channel.send(`The command \`${args[0]}\` has been reloaded`);
};

exports.info = {
    name: 'reload',
    usage: 'reload <command>',
    help: 'Reloads the given command',
    owner: true,
};
