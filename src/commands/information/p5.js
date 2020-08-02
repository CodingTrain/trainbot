exports.run = async (bot, msg, args) => {
    if (args.length === 0){
        throw new Error(':x: Please provide a keyword to search for');
    }
    await msg.channel.send(`https://p5js.org/reference/#/p5/${args[0]}`);
};

exports.info = {
    name: 'p5',
    usage: 'p5 <keyword>',
    help: 'returns a link to the p5 reference for the requested keyword',
};
