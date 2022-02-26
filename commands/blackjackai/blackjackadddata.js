const { bot } = require("../../exports")

let data_store = require('data-store');
let data = new data_store({ path: process.cwd() + '/bai_data.json' });

module.exports = {
    name: 'blackjackadddata',
    description: 'Add blackjack data.',
    aliases: ['bad'],
    usage: '<hand value> <1/2 (hit/stand)>',
    cooldown: 0,
    execute(message, args) {
        (async () => {
            data.set(args[1], args[2]);
            message.react('✅');
        })();
    }
}