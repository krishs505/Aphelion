const { cw } = require("../../index")

module.exports = {
    name: 'ping',
    description: 'Check the latency of the bot.',
    aliases: ['latency'],
    usage: ' ',
    cooldown: 0,
    execute(message) {
        (async () => {
            const sent = await message.channel.send('**Pong!**');
            const botlatency = sent.createdTimestamp - message.createdTimestamp;

            if (botlatency > 0 && botlatency < 1000) {
                sent.edit('**Pong!**\nBot Latency: **' + botlatency + 'ms**\nAPI Latency: **' + cw.ping + 'ms**');
            } else if (botlatency < 0) {
                sent.edit('**Pong!**\nBot Latency: **' + botlatency * -1 + 'ms**\nAPI Latency: **' + cw.ping + 'ms**');
            }
        })();
    }
}