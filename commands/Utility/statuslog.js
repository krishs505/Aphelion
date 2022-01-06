const { bot } = require("../../index")
let data_store = require('data-store');
let settings = new data_store({ path: process.cwd() + '/settings.json' });

module.exports = {
    name: 'statuslog',
    description: 'Turns on the status log!',
    aliases: ['statuslogs'],
    cooldown: 0,
    od: true,
    execute(message) {
        (async () => {
            message.delete();
            
            var sl = `settings.status_log`;
            var oo;
            if (!settings.hasOwn(sl)) {
                settings.set(sl, true);
                oo = 'on';
            } else {
                settings.del(sl);
                oo = 'off';
            }

            message.client.channels.cache.get('860174499181101058').send(`Status Log has been turned \`${oo}\`.`)
        })();
    }
}