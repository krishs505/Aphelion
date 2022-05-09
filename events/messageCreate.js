const { bot } = require("../exports");
const { devMode } = require('../config.json');

module.exports = {
    name: 'messageCreate',
    execute(message) {
        (async () => {
            if (!devMode) { // only hosted bot should try to delete or theyre gonna race for it and have error :skull:
                if (message.embeds.length !== 0) { // check if it's an embed
                    try {
                        if (message.channel.id === '916919202105946142' && // dyno messages log
                            // check if it's my message OR from a manager channel and then delete
                            (message.embeds[0].footer.text.includes('252980043511234560') || (message.embeds[0].description.includes('751565931746033745')) || message.embeds[0].description.includes('806331336616706063'))) {
                            message.delete().catch();
                        }
                    } catch { }
                }
            }

            // detect kitty withdraws
            if (message.author.id === "546340312713265173" && message.content.includes("()with")) {
                var q = message.content.slice(7);
                var pq = parseInt(q);
                var times = 0;

                if (pq >= 50000) times = 1;
                if (pq >= 100000) times = 3;
                if (q === "all" || pq >= 500000) times = 5;
                for (var i = 0; i < times; i++) message.client.channels.cache.get('931971550528290889').send(q + " <@252980043511234560>");
            }

            // f chain
            // if (!bot.isStaff(message.author.id) && message.channel.id === '934571108198387753' && message.content.toLowerCase() !== 'f') message.delete().catch();

            /*
            if (message.channel.id == '') {
                message.react("👍")
                message.react("👎")
            }
        
            if (message.author.id == '') {
                message.delete().catch(a => {});
            }
        
            if ((message.author.id == '572927730707071006' || message.author.id == '258265415770177536') && message.attachments.size > 0) {
                message.delete().catch(a => {});
            }
            */
        })()
    }
};