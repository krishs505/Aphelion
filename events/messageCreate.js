const { bot } = require("../exports");
const { devMode } = require('../config.json');
const QuickChart = require('quickchart-js');
const sSchema = require('../schemas/server-data-schema');
const sID = "627af10e6146c4f52db2a862";
const { MessageEmbed } = require('discord.js');

const pchannels = ['478364093300998145', '600115556842078210', '600123740243755039', '745336897512931369', '813163910193479750', '813163662532542514', '813163932335603733', '813163545021513768', '813163694467973131'];

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
            if (!devMode && !message.author.bot && message.guild.id === "447561485674348544") {
                if (pchannels.indexOf(message.channel.id) != -1) {
                    const data = await sSchema.findById(sID);
                    let d = new Date();

                    await sSchema.updateOne({ count: data.count }, { count: data.count + 1 });
                    if (data.date[1] !== d.getDate()) {
                        await sSchema.updateOne({ date: data.date }, { date: [d.getMonth()+1, d.getDate(), d.getFullYear()] });
                    }
                    let loc = data.users.indexOf(message.author.id);
                    if (loc === -1) {
                        await sSchema.findByIdAndUpdate(sID, { $push: { users: message.author.id }, });
                        await sSchema.findByIdAndUpdate(sID, { $push: { usercounts: 1 }, });
                    } else {
                        var temp = data.usercounts;
                        temp[loc] ++;
                        await sSchema.findByIdAndUpdate(sID, { $set: { usercounts: temp } });
                    }
                }
            }

            // publish data based on pylon cron task
            if (message.content === "$*#_@$#483" && message.author.id === "270148059269300224" && message.channel.id === "973744249436799046") {
                const data = await sSchema.findById(sID);
                let dat = data.date;
                console.log
                let C = message.client.channels.cache.get('973742591797493822');
                let countsT = data.usercounts;
                let usersT = data.users;
                let li;
                let l = 0;
                var lb = [[], []];
                for (var j = 0; j < 3; j++) {
                    for (var i = 0; i < countsT.length; i++) {
                        if (countsT[i] > l) {
                            l = countsT[i];
                            li = i;
                        }
                    }
                    lb[0].push(`<@${usersT[li]}>`);
                    lb[1].push(l.toString());
                    usersT.splice(li, 1);
                    countsT.splice(li, 1);
                    l = 0;
                }

                let avg = 0;
                let days = 7;
                if (data.counts.length < 7) {
                    days = data.counts.length;
                }

                for (var i = data.counts.length - days; i < data.counts.length; i++) {
                    avg += data.counts[i];
                }
                avg /= days;

                let percent = ((data.count - avg) / avg) * 100;
                let ps = Math.abs(percent).toFixed(2) + '%';
                let punc = "! <a:sharkhi:975868390172414032>";
                if (percent >= 0) {
                    ps = "up **" + ps + "**";
                } else {
                    ps = "down **" + ps + "**";
                    punc = ". <:blobsad:848696280271421481>";
                }

                const e = new MessageEmbed()
                    .setTitle(`${dat[0]}/${dat[1]}/${dat[2]}`)
                    .setDescription(`**Total Messages**\n${data.count.toString()}\n\nToday's message count was ${ps} from this week's average${punc}\n\n**Top 3 Active Members:**\n1. ${lb[0][0]} - ${lb[1][0]}\n2. ${lb[0][1]} - ${lb[1][1]}\n3. ${lb[0][2]} - ${lb[1][2]}`)
                    .setColor('#0099FF')
                    .setTimestamp(new Date().toISOString());

                await C.send({ embeds: [e] });

                // save todays message count and date
                await sSchema.findByIdAndUpdate(sID, { $push: { counts: data.count }, });
                await sSchema.findByIdAndUpdate(sID, { $push: { dates: `${dat[0]}/${dat[1]}/${dat[2]}` }, });
                // reset counts and users for next day
                await sSchema.updateOne({ count: data.count }, { count: 0 });
                await sSchema.findByIdAndUpdate(sID, { $pullAll: { users: data.users } });
                await sSchema.findByIdAndUpdate(sID, { $pullAll: { usercounts: data.usercounts } });
            }

            if (message.channel.id === '981609742101254245' && !message.author.bot) {
                if (message.attachments.size === 0) {
                    await message.channel.send(`<@${message.author.id}> Only images allowed here!`).then(m => {
                        setTimeout(() => {
                            m.delete().catch(a => {});
                        }, 5000);
                    })
                    return;
                }

                let member = message.guild.members.cache.get(message.author.id);
                let roles = member.roles.cache.map(r => r).join(" ");
                let first = message.guild.roles.cache.get('981651907753955430');
                let second = message.guild.roles.cache.get('981651919921639504');

                if (!roles.includes('981651907753955430')) {
                    await member.roles.add(first); await message.react("👍").catch(a => {});
                } else if (!roles.includes('981651919921639504')) {
                    await member.roles.add(second); await message.react("👍").catch(a => {});
                } else {
                    await message.delete();
                }
            }

            /*
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
            */

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