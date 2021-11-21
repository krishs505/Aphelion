const {
    bot
} = require("../../index")

module.exports = {
    name: 'cf',
    description: 'Calculate the common factors between two numbers.',
    aliases: ['commonfactors'],
    usage: '<num1> <num2>',
    cooldown: 0,
    execute(message, args) {
        (async () => {
            if ((parseInt(args[0]) > 25000000 || parseInt(args[1]) > 25000000) && !bot.isChick3n(message.author.id)) return message.channel.send('Sorry, but numbers above 25,000,000 are not permitted to be calculated as they slow down Aphelion for longer periods of time!')
            if (!args[0] || !args[1]) return message.channel.send('Please include two integers!');
            if (Number.isInteger(args[0])) return message.channel.send(args[0] + ' is not an integer!')
            if (Number.isInteger(args[1])) return message.channel.send(args[1] + ' is not an integer!')

            const processing = await message.channel.send('<a:loading_forever:822539925786329149> Processing...')
            var num1 = parseInt(args[0]);
            var num2 = parseInt(args[1]);
            var factors1 = '';
            // var factors2 = '';
            var cf = '';
            var done1 = false;
            var done2 = false;

            for (let i = 1; i <= num1; i++) {
                if (num1 % i == 0) {
                    factors1 = factors1 + ',' + i + ',';
                }
                if (i == num1) {
                    done1 = true;
                }
            }

            if (done1) {
                for (let i = 1; i <= num2; i++) {
                    if (num2 % i == 0) {
                        // factors2 = factors2 + ',' + i;
                        if (factors1.includes(',' + i + ',')) {
                            if (cf === '') {
                                cf = i;
                            } else {
                                cf = cf + ', ' + i;
                            }
                        }
                    }
                    if (i == num2) {
                        done2 = true;
                    }
                }
            }

            if (done2) {
                if (cf === '' || cf === '1') {
                    var sent = await message.channel.send('No common factors found between the two numbers!')
                } else {
                    var sent = await message.channel.send(`Common Factors between **${args[0]}** and **${args[1]}**:\n${cf}`)
                }
                processing.delete();

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