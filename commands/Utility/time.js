const { bot } = require("../../index");
const Discord = require('discord.js')

module.exports = {
    name: 'time',
    description: "What time is it in India? China? You name it. I'll give it.",
    usage: '<location>',
    // aliases: ['av', 'pfp', 'icon'],
    cooldown: 0,
    oc: true,
    execute(message, args) {
        (async () => {
            var d = new Date();
            var dA = [d.getDate(), d.getHours(), d.getMinutes()];
        })();
    }
}