const { bot } = require("../../exports");
const { ws } = require("../../index");

module.exports = {
    name: 'ping',
    description: 'Check the latency of the bot.',
    aliases: ['latency'],
    usage: '',
    cooldown: 2,
    execute(message) {
        (async () => {
            await message.channel.send("Calculating...").then(m => {
                var msg = `**Pong!** ${m.createdTimestamp - message.createdTimestamp}ms`;
                if (bot.isLab(message)) msg += `\nDAPI: ${ws.ping}ms`;
                m.edit(msg);
            });
        })();
    }
}