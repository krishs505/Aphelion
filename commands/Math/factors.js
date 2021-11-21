const { bot } = require("../../index")

module.exports = {
    name: 'factors',
    description: 'Calculate all the factors of a number.',
    aliases: ['fs'],
    usage: '<integer>',
    cooldown: 0,
    execute(message, args) {
        (async () => {
            if (parseInt(args[0]) > 25000000 && !bot.isChick3n(message.author.id)) return message.channel.send('Sorry, but numbers above 25,000,000 are not permitted to be calculated as they slow down Aphelion for longer periods of time!')
            if (!args[0]) return message.channel.send('Please include a number!');
            if (Number.isInteger(args[0])) return message.channel.send(args[0] + ' is not an integer!')

            const processing = await message.channel.send('<a:loading_forever:822539925786329149> Processing...')
            var num = args[0];
            var factors = '';
            var done = false;

            for (let i = 1; i <= num; i++) {
                if (num % i === 0) {
                    if (factors === '') {
                        factors = i;
                    } else {
                        factors = factors + ', ' + i;
                    }
                }

                // if (i === num) done = true;
            }

            // if (done) {
                const sent = await message.channel.send(`Factors of **${args[0]}**:\n${factors}`)
                processing.delete();

                const latency = sent.createdTimestamp - message.createdTimestamp;
                if (latency > 1000) {
                    message.channel.send('Time Taken: **' + latency / 1000 + ' seconds**');
                } else {
                    message.channel.send('Time Taken: **' + latency + 'ms**');
                }
            // }
        })();
    }
}