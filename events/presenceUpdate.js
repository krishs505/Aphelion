const { bot } = require("../exports");
const { devMode } = require('../config.json');
const Schema = require('../schemas/settings-schema');
const { ogg } = require("prism-media");
const sID = '61d8b1ae44c5fc5637085070';

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
            //if (devMode) return

            if (newPresence.guild.id === '777982758311034950') { // crypto tracker

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

            } else if (newPresence.guild.id === '447561485674348544') { // status log

                if (newPresence.user.bot) return
                const s = await Schema.findById(sID);
                if (!s.statuses.length === 0) return

                var tracking = s.statuses;
                if (tracking[0] !== 'ta' && tracking.indexOf(newPresence.user.id) === -1) return

                var { user } = newPresence;
                try {
                    var os = oldPresence.status;
                    var ns = newPresence.status;
                } catch {
                    return;
                }

                if (ns !== os) {
                    var C = newPresence.client.channels.cache.get('935221863553044500');
                    var u = `<@${user.id}>`;
                    if (user.id === '252980043511234560') u = '**Kihei**';
                    var t = new Date();
                    t = t.toString().replace('GMT-0400 (Eastern Daylight Time)', 'ET');
                    t = t.toString().replace('GMT-0500 (Eastern Standard Time)', 'ET');
                    C.send(`${u} | ${bot.getStatus(os)} **-->** ${bot.getStatus(ns)} | ${t}`);
                }
            }
        })()
    }
}