const { bot } = require("../../exports")

module.exports = {
    name: 'repeatingtofrac',
    description: 'Convert a repeating decimal to a fraction.',
    aliases: ['rtf'],
    usage: '<decimal>',
    cooldown: 0,
    execute(message, args) {
        (async () => {
            if (!args[0]) return message.channel.send('Please provide a decimal!');

            var s = performance.now();

            var split = args[0].split(".");
            var den = Math.pow(10, split[1].length) - 1;
            var result = bot.simplifyFraction(bot.in(split[1]) + (bot.in(split[0]) * den), den);

            var e = performance.now();

            await message.channel.send(`Result: ${result}\n${bot.findLatency(s, e)}`);
            
        })();
    }
}