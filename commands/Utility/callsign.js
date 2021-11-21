const { bot } = require("../../index");

module.exports = {
    name: 'callsign',
    description: 'Generate a random US callsign!',
    usage: '(optional repeat times)',
    aliases: ['cs'],
    cooldown: 0,
    execute(message, args) {
        (async () => {
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
            var repeat = 1;
            if (args[0]) repeat = args[0];
            if (repeat > 5 && !bot.isChick3n(message.author.id)) { message.channel.send('You cannot request more than 5 callsigns at a time!'); repeat = 0; }
            for (var i = 0; i < repeat; i++) {
                var result = [];
                var l = Math.floor(Math.random() * 5);
                for (var j = 0; j <= 4; j++) {
                    result.push(characters.charAt(Math.floor(Math.random() * characters.length)));
                }
                message.channel.send(`N${result.join('')}`);
            }
        })();
    }
}

