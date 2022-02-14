const { cw, bot } = require("../../index");

module.exports = {
    name: 'ping',
    description: 'Check the latency of the bot.',
    aliases: ['latency'],
    usage: ' ',
    cooldown: 0,
    execute(message) {
        (async () => {
            var now = Date.now();
            var l = Math.abs(message.createdTimestamp - now);

            var m = `**Pong!** ${l.toString()}ms`;
            if (bot.isLab(message)) m += `\nDAPI: ${cw.ping}ms`;
            
            await message.channel.send(m);
        })();
    }
}