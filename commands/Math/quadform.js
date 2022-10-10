const { bot } = require("../../exports");

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
            var n1 = -1 * b;
            var n2 = bot.simplRoot(Math.abs(discrim));
            var d = 2 * a;

            console.log(discrim)
            console.log(n1)
            console.log(n2)
            console.log(d)

            var gcf = bot.gcf(Math.abs(n1), n2[0], Math.abs(d));
            console.log(gcf);

            if (gcf !== null) {
                if (n2[0] / gcf === 1) {
                    result = `${n1 / gcf} ± sqrt(${n2[1]})i`;
                } else {
                    result = `${n1 / gcf} ± ${n2[0] / gcf}sqrt(${n2[1]})i`;
                }
                if (d / gcf !== 1) {
                    result += ` / ${d / gcf}`;
                }
            }
        } else if (!Number.isInteger(Math.sqrt(discrim))) {
            result = `${-1 * b} ± ${discrim} / ${2 * a}`;
        } else {
            result = `${(-1 * b + Math.sqrt(discrim)) / (2 * a)}** or **${(-1 * b - Math.sqrt(discrim)) / (2 * a)}`;
        }

        message.channel.send(`Result: x = **${result}**`);
    }
}