const { bot } = require("../../exports")

module.exports = {
    name: 'average',
    description: 'Find the average between multiple numbers.',
    aliases: ['mean', 'avg'],
    usage: '[numbers separated by spaces]',
    cooldown: 0,
    execute(message, args) {
        if (!args[1]) return message.channel.send('Please include at least 2 numbers to find the average of!')

        var result = 0;
        for (var i = 0; i <= args.length - 1; i++) {
            if (isNaN(args[i])) return message.channel.send(':x: `' + args[i] + '` is not a number!');
            result += parseFloat(args[i]);
        }

        message.channel.send(`Result: **${result / args.length}**`);
    }
}