const { bot } = require("../../index");

module.exports = {
    name: 'shufflearray',
    description: 'Randomly shuffle an array.',
    aliases: ['shuffle'],
    usage: '<array>',
    cooldown: 0,
    execute(message, args) {
        (async () => {

            var s = Date.now();
            var shuffled = bot.shuffleArray(args);
            var e = Date.now();
            
            await message.channel.send(`${shuffled.join(" ")}\n${bot.findLatency(s, e)}`);
            
        })();
    }
}