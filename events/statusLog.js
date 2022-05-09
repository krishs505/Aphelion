const { bot } = require("../exports");
const { devMode } = require('../config.json');
const Schema = require('../schemas/settings-schema');
const sID = '61d8b1ae44c5fc5637085070';

module.exports = {
    name: 'presenceUpdate',
    execute(oldPresence, newPresence) {
        (async () => {
            if (devMode) return
            if (newPresence.guild.id !== '447561485674348544') return;
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
        })()
    }
}