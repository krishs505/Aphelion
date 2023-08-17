const { bot } = require("../exports");
const { devMode } = require('../config.json');
const Discord = require('discord.js')

function dateFormat(d) {
    var dA = d.toString().split(' ');
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    if (h > 12) h -= 12;
    if (m < 10) m = "0" + m.toString();
    if (s < 10) s = "0" + s.toString();
    return `${h}:${m}:${s} ${dA[1]} ${dA[2]} ${dA[3]}`;
}

module.exports = {
    name: 'presenceUpdate',
    execute(oldPresence, newPresence) {
        (async () => {


            if (devMode) return

            if (newPresence.guild.id === '777982758311034950') { // crypto tracker
                /*
                                try {
                                    var op = oldPresence.activities[0].name.substring(6, 11);
                                    var np = newPresence.activities[0].name.substring(6, 11);
                                } catch {
                                    return;
                                }
                
                                if (np !== op) {
                                    var cID = "";
                                    var d = new Date();
                                    var price = parseInt(np);
                                    var msg = `**$${np}** | ${dateFormat(d)}`;
                
                                    switch (newPresence.user.id) {
                                        case '927749995757699113': // solana
                                            cID = '998801601588375572';
                                            if (price >= 70) msg += " <@252980043511234560>";
                                            break;
                                        case '927613829381259345': // bitcoin
                                            cID = '965752828394102784';
                                            if (price >= 40000) msg += " <@252980043511234560>";
                                            break;
                                    }
                
                                    if (cID !== "") {
                                        let C = newPresence.client.channels.cache.get(cID);
                                        await C.send(msg);
                                    }
                                }
                */
            } else if (newPresence.guild.id === '1095727318925848656') { // status log

                if (newPresence.user.bot) return
                if (oldPresence === null || newPresence === null) return

                /*
                const s = await Schema.findById(sID);
                if (!s.statuses.length === 0) return
    
                var tracking = s.statuses;
                if (tracking[0] !== 'ta' && tracking.indexOf(newPresence.user.id) === -1) return
                */

                var { user } = newPresence;
                var os = "_ _";
                var ns = "_ _";
                var ostat = "";
                var nstat = "";

                //console.log(oldPresence)
                //console.log(newPresence)

                try {
                    for (var i = 0; i < oldPresence.activities.length; i++) {
                        if (oldPresence.activities[i].name === "Custom Status") { os = oldPresence.activities[i].state; }
                    }
                } catch {}

                try {
                    for (var i = 0; i < newPresence.activities.length; i++) {
                        if (newPresence.activities[i].name === "Custom Status") { ns = newPresence.activities[i].state; }
                    }
                } catch {}

                try { ostat = oldPresence.status; } catch { ostat = oldPresence.clientStatus; }
                try { nstat = newPresence.status; } catch { nstat = newPresence.clientStatus; }

                //console.log(os)
                //console.log(ns)
                //console.log(ostat)
                //console.log(nstat)

                if (ns !== os) {
                    var C = newPresence.client.channels.cache.get('1141754855225032784');
                    var u = `<@${user.id}>`;

                    if (nstat !== 'offline') {
                        //console.log("yes")

                        var emb = new Discord.EmbedBuilder().setDescription(u + ' changed their status to: `' + ns + '`').setColor('#0099FF').setTimestamp();
                        
                        if (ostat === 'offline') {
                            var emb = new Discord.EmbedBuilder().setDescription(u + ' went ' + bot.getStatus(nstat) +  ' with status: `' + ns + '`').setColor('#0099FF').setTimestamp();
                        }
                        
                        C.send({ embeds: [emb] });
                    } else {
                        var emb = new Discord.EmbedBuilder().setDescription(u + ' went <:offline:999477875428298752> with status: `' + os + '`').setColor('#0099FF').setTimestamp();
                        C.send({ embeds: [emb] });
                    }
                }
            }
        })()
    }
}