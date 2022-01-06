const { bot } = require("../../index")

module.exports = {
    name: 'simplifyfraction',
    description: 'Calculate the common factors between two numbers.',
    aliases: ['simplifyfrac', 'simplify', 'sf'],
    usage: '<numerator> <denominator>',
    cooldown: 0,
    execute(message, args) {
        (async () => {
            var type = 1;
            var num = args[0];
            var den = args[1];
            if (args[1] === '/') {
                den = args[2];
                type = 2;
            }

            // if ((parseInt(args[0]) > 25000000 || parseInt(args[1]) > 25000000) && !bot.isKihei(message.author.id)) return message.channel.send('Sorry, but numbers above 25,000,000 are not permitted to be calculated as they slow down Aphelion for longer periods of time!')
            if (type === 1 && (!args[0] || !args[1])) return message.channel.send('That is not a valid fraction!');
            if (type === 2 && (!args[0] || !args[1] || !args[2])) return message.channel.send('That is not a valid fraction!');
            if (Number.isInteger(args[0])) return message.channel.send(args[0] + ' is not an integer!')
            if (type === 1 && Number.isInteger(args[1])) return message.channel.send(args[1] + ' is not an integer!')
            if (type === 2 && Number.isInteger(args[2])) return message.channel.send(args[1] + ' is not an integer!')

            if (parseInt(num) % parseInt(den) === 0) return message.channel.send(`Result: **${parseInt(num) / parseInt(den)}**`)

            const processing = await message.channel.send('<a:loading_forever:822539925786329149> Processing...')
            var num1 = parseInt(num)
            var num2 = parseInt(den)
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
                                cf = '' + i;
                            } else {
                                cf = cf + ' ' + i;
                            }
                        }
                    }
                    if (i == num2) {
                        done2 = true;
                    }
                }
            }

            if (done2) {
                var cfa = cf.split(' ');
                var gcf = cfa[cfa.length - 1];
                var nnum = num1 / gcf;
                var nden = num2 / gcf
                var result = `**${nnum}/${nden}**`;
                if (nnum / nden > 1) {
                    result = `**${nnum}/${nden}** or **${Math.round(nnum / nden)} ${nnum % nden}/${nden}**`
                }
                var sent = await message.channel.send(`Result: ${result}`)
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