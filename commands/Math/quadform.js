const { bot } = require("../../index");

module.exports = {
    name: 'quadform',
    description: 'Calculate the roots (x-ints) of a quadratic function using the quadratic formula.',
    aliases: ['qf'],
    usage: '<a> <b> <c>',
    cooldown: 0,
    execute(message, args) {
        if (!args[0] || !args[1] || !args[2]) return message.channel.send('Please include all values for the syntax! Use +help quadform for more information.');

        if (isNaN(args[0])) {
            return message.channel.send(':x: `' + args[0] + '` is not a number!');
        } else if (isNaN(args[1])) {
            return message.channel.send(':x: `' + args[1] + '` is not a number!');
        } else if (isNaN(args[2])) {
            return  message.channel.send(':x: `' + args[2] + '` is not a number!');
        }

        var a = parseInt(args[0]);
        var b = parseInt(args[1]);
        var c = parseInt(args[2]);

        var discrim = Math.pow(b, 2) - 4 * a * c;
        var result;

        // if (discrim < 0) return message.channel.send('ERROR: **Negative Square Root detected!**\nDiscriminator -> Imaginary number: **' + discrim * -1 + 'i**')

        if (discrim < 0) {
            var s = Math.sqrt(discrim / -1);
            var t = 2 * a;

            var f1 = bot.findFactors(Math.abs(b));
            var f2 = bot.findFactors(s);
            var f3 = bot.findFactors(Math.abs(t));
            var cf;
            
            for (var i = 0; i <= f1.length; i++) {
                if (f2.indexOf(f1[i]) != -1 && f3.indexOf(f1[i]) != -1) {
                    cf = f1[i];
                }
            }
            console.log(cf);

            if (cf) {
                t = t / cf;

                result = `${(-1 * b) / cf} ± ${s / cf}i / ${t}`;

                result = `${(-1 * b) / cf} ± ${s / cf}i`;
                if (t / cf === 1) {
                    result = `${(-1 * b) / cf} ± ${s / cf}i`;
                } else {
                    result = `${(-1 * b) / cf} ± ${s / cf}i / ${(t) / cf}`;
                }
            } else {
                result = `${-1 * b} ± ${s}i / ${t}`;
            }
        } else if (!Number.isInteger(Math.sqrt(discrim))) {
            result = `${-1 * b} ± ${discrim} / ${2 * a}`;
        } else {
            result = `${(-1 * b + Math.sqrt(discrim)) / (2 * a)}** or **${(-1 * b - Math.sqrt(discrim)) / (2 * a)}`;
        }

        message.channel.send(`Result: x = **${result}**`);
    }
}