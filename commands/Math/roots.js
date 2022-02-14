const { bot } = require("../../index")

module.exports = {
    name: 'roots',
    description: 'Calculate all the perfect square root factors of a number.',
    usage: '<integer>',
    cooldown: 0,
    execute(message, args) {
        (async () => {
            if (parseInt(args[0]) > 25000000 && !bot.isKihei(message.author.id)) {
                return message.channel.send('Sorry, but numbers above 25,000,000 are not permitted to be calculated as they slow down Aphelion for longer periods of time!')
            }

            let processing;

            if (!Number.isInteger(parseInt(args[0]))) {
                return message.channel.send('Please include an integer!');
            } else {
                processing = await message.channel.send('<a:loading_forever:822539925786329149> Processing...')
            }

            var num = args[0];
            var factors = '';
            var done = false;

            for (let i = 1; i <= num; i++) {
                if (num % i == 0) {
                    if (Number.isInteger(Math.sqrt(i))) {
                        if (factors == '') {
                            factors = i;
                        } else {
                            factors = factors + ', ' + i;
                        }
                    }
                }

                if (i == num) {
                    done = true;
                }
            }

            if (done) {
                const sent = await message.channel.send('Roots:\n' + factors)
                processing.delete().catch(a => {});

                const latency = sent.createdTimestamp - message.createdTimestamp;
                if (latency > 1000) {
                    message.channel.send('Time Taken: **' + latency / 1000 + ' seconds**');
                } else {
                    message.channel.send('Time Taken: **' + latency + 'ms**');
                }

                done = false;
            }
        })();
    }
}