const { bot } = require("../../exports");

module.exports = {
    name: 'quadratic',
    description: 'Factor a quadratic equation.',
    aliases: ['qe', 'factor'],
    usage: '<equation>',
    cooldown: 0,
    od: true,
    execute(message, args) {
        (async () => {
            if (!args[0]) return message.channel.send('Please include an equation!');

            var a = parseInt(args[0]);
            var b = parseInt(args[1]);
            var c = parseInt(args[2]);

            dfq = bot.disallowFactorsOfQuadrillion(Math.abs(c), message);
            if (dfq) return;

            var factors = bot.findFactors(Math.abs(c));

            var oFac = bot.organizeFactors(factors);
            var f1 = oFac[0];
            var f2 = oFac[1];
            
            
            console.log(factors)
            console.log(f1)
            console.log(f2)
            

            var x;
            var y;
            var exp = 'Not factorable';

            for (var i = 0; i < f1.length; i++) {
                x = f1[i];
                y = f2[i];
                if (c > 0 && x + y == Math.abs(b)) {
                    if (b > 0) exp = `(x + ${x})(x + ${y})`;
                    if (b < 0) exp = `(x - ${x})(x - ${y})`;
                } else if (c < 0) {
                    if (x - y == b) exp = `(x + ${x})(x - ${y})`;
                    if (y - x == b) exp = `(x + ${y})(x - ${x})`;
                }
            }

            message.channel.send(exp);
            

            /*
            x2 + 9x + 20
            (x + 4) (x + 5)

            x2 + x - 20
            (x - 4) (x + 5)
            */

        })();
    }
}