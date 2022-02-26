const { bot } = require("../../exports")

let data_store = require('data-store');
let data = new data_store({ path: process.cwd() + '/bai_data.json' });

module.exports = {
    name: 'blackjackai',
    description: 'Determine the safest move you should take in a blackjack.',
    aliases: ['bai'],
    usage: '<hand value>',
    cooldown: 0,
    execute(message, args) {
        (async () => {
            // if (data.has(args[1]))
        })();
    }
}