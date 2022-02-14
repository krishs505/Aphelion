const { bot } = require("../../index")

function median(values) {
    var half = Math.floor(values.length / 2);

    if (values.length % 2) return values[half];

    return (values[half - 1] + values[half]) / 2.0;
}

module.exports = {
    name: 'quadratic',
    description: 'Solve a quadratic equation.',
    aliases: ['qe', 'factor'],
    usage: '<equation>',
    cooldown: 0,
    od: true,
    execute(message, args) {
        (async () => {
            // if (parseInt(args[0]) > 25000000 && !bot.isKihei(message.author.id)) return message.channel.send('Sorry, but numbers above 25,000,000 are not permitted to be calculated as they slow down Aphelion for longer periods of time!')
            if (!args[0]) return message.channel.send('Please include an equation!');
            // if (Number.isInteger(args[0])) return message.channel.send(args[0] + ' is not an integer!')

            // const processing = await message.channel.send('<a:loading_forever:822539925786329149> Processing...')
            var a = parseInt(args[0]);
            console.log(a)
            var b = parseInt(args[1]);
            var c = parseInt(args[2]);
            var factors = [];
            var f1 = [];
            var f2 = [];
            var cneg = false;
            var num;

            if (c < 0) { cneg = true; num = c * -1; }

            for (let i = 1; i <= num; i++) {
                if (num % i == 0) {
                    factors.push(i);
                }
            }

            // const sent = await message.channel.send(`Factors of **${c}**:\n${factors}`)

            /*for(var i = 0; i <= Math.floor(factors.length / 2); i++) {
                f1.push();
            }*/

            console.log(factors)

            var half = Math.floor(factors.length / 2); // accurate median for odd set, higher median for even set
            var m;  // accurate median for odd set, lower median for even set
            var type;
            var eq;

            if (factors.length % 2) { // testing for odd set
                m = half;
            } else {
                m = half - 1;
            }

            for (var i = 0; i <= m; i++) {
                f1.push(factors[i]);
            }
            for (var i = factors.length - 1; i >= half; i--) {
                f2.push(factors[i]);
            }

            console.log(f1)
            console.log(f2)

            /*
            x2 + 9x + 20
            (x + 4) (x + 5)

            x2 + 9x + 1
            (x + 4) (x + 5)

            x2 + 9x - 1
            (x + 4) (x + 5)

            x2 + x - 20
            (x - 4) (x + 5)
            */

            for (var i = 0; i <= f1.length; i++) {
                if (f1[i] + f2[i] === b) {
                    eq = `(x + ${f1[i]}) (x + ${f2[i]})`
                } else if (f1[i] + f2[i] === b*-1) {
                    eq = `(x - ${f1[i]}) (x - ${f2[i]})`
                } else if (f1[i] - f2[i] === b) {
                    eq = `(x + ${f1[i]}) (x - ${f2[i]})`
                } else if (f2[i] - f1[i] === b) {
                    eq = `(x + ${f2[i]}) (x - ${f1[i]})`
                } else {
                    eq = 'Uh oh!'
                }
            }

            message.channel.send(eq)

            return

            // processing.delete().catch(a => {});

            const latency = sent.createdTimestamp - message.createdTimestamp;
            if (latency > 1000) {
                message.channel.send('Time Taken: **' + latency / 1000 + ' seconds**');
            } else {
                message.channel.send('Time Taken: **' + latency + 'ms**');
            }
        })();
    }
}