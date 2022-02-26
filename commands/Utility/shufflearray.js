const { bot } = require("../../exports");

module.exports = {
    name: 'shufflearray',
    description: 'Randomly shuffle an array.',
    aliases: ['shuffle'],
    usage: '<array>',
    cooldown: 0,
    execute(message, args) {
        (async () => {

            var s = performance.now();
            var shuffled = bot.shuffleArray(args);
            var e = performance.now();
            
            await message.channel.send(`${shuffled.join(" ")}\n${bot.findLatency(s, e)}`);
            
        })();
    }
}