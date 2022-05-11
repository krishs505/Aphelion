const { bot } = require("../exports");
const { devMode } = require('../config.json');
const sSchema = require('../schemas/server-data-schema');
const sID = "627af10e6146c4f52db2a862";

const pchannels = ['478364093300998145', '707043935985598524', '600115556842078210', '600123740243755039', '745336897512931369', '813163910193479750', '813163662532542514', '813163932335603733', '813163545021513768', '813163694467973131', '863917481490776064', '863919377421697074', '863919353938182184'];

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
                    } catch {}
                }
            }

            // server activity data
            if (!message.author.bot && message.guild.id === "447561485674348544") {
                if (pchannels.indexOf(message.channel.id) != -1) {
                    const data = await sSchema.findById(sID);
                    let d = new Date();

                    await sSchema.updateOne({ count: data.count }, { count: data.count + 1 });
                    if (data.date[1] !== d.getDate()) {
                        await sSchema.updateOne({ date: data.date }, { date: [d.getMonth(), d.getDate(), d.getFullYear()] });
                    }
                }
            }

            if (message.content === "$*#_@$#483" && message.author.id === "270148059269300224" && message.channel.id === "973744249436799046") {
                const data = await sSchema.findById(sID);
                let dat = data.date;
                let C = message.client.channels.cache.get('973742591797493822');

                await C.send(`__**${dat[0]} / ${dat[1]} / ${dat[2]}**__\n\n# of messages: **${data.count}**`);
                await sSchema.findByIdAndUpdate(sID, { $push: { counts: data.count }, });
                await sSchema.updateOne({ count: data.count }, { count: 0 });
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