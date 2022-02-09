const { bot } = require("../../index")

module.exports = {
    name: 'factors',
    description: 'Calculate all the factors of a number.',
    aliases: ['fs'],
    usage: '<integer>',
    cooldown: 0,
    execute(message, args) {
        (async () => {
            if (parseInt(args[0]) > 100000000 && !bot.isKihei(message.author.id)) return message.channel.send('Sorry, but numbers above 100,000,000 are not permitted to be calculated as they slow down Aphelion for longer periods of time!');
            if (!args[0]) return message.channel.send('Please include a number!');
            if (Number.isInteger(args[0])) return message.channel.send(args[0] + ' is not an integer!');

            const processing = await message.channel.send('<a:loading_forever:822539925786329149> Processing...');
            var num = parseInt(args[0]);
            var factors = [];

            var s = Date.now();
            // factors = bot.findFactorsProgress(num);
            for (let i = 1; i <= num; i++) {
                if (num % i === 0) factors.push(i);
            }
            var e = Date.now();

            await message.channel.send(`Factors of **${args[0]}**:\n${factors.join(", ")}\n${bot.findLatency(s, e)}`);
            processing.delete();
        })();
    }
}