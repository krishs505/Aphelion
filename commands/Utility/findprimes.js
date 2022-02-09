const { bot } = require("../../index");

module.exports = {
    name: 'findprimes',
    description: "Find large prime numbers.",
    usage: ' ',
    cooldown: 0,
    od: true,
    execute(message, args) {
        (async () => {

            var primes = [];

            for (var i = bot.randomInt(100000000, 800000000); i <= parseInt(args[0]); i++) {
                console.log(i);
                var factors = bot.findFactors(i);

                if (factors.length <= 2) {
                    console.log("PRIME: " + i);
                    primes.push(i);
                }
            }

            console.log(primes);

        })();
    }
}