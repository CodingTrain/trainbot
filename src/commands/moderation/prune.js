exports.run = async (bot, msg, args) => {
    if (args.length < 1) throw new Error('I need an amount of messages to prune');
    if (Number.isNaN(args[0])) throw new Error('Your amount isn\'t a number.');
    if (args[0] > 50) throw new Error('You can\'t delete more that 50 messages at once');

    const messages = await msg.channel.messages.fetch({ limit: Number(args[0]) + 1 });

    for (const msgToDelete of messages.values()) {
        if (msgToDelete.deletable) {
            msgToDelete.delete();
        } else {
            msg.channel.send(
                `The following message is not deletable by me\n>>> ${msgToDelete.content}`,
            );
        }
    }
};

exports.info = {
    name: 'prune',
    usage: 'prune <number of messages>',
    help: 'Prunes a specific amount of messages',
    permissions: ['KICK_MEMBERS'],
};
