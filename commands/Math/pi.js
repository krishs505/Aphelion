const { bot } = require("../../exports");

module.exports = {
    name: 'pi',
    description: 'Calculate PI.',
    usage: '[optional digits]',
    cooldown: 2,
    od: true,
    execute(message, args) {
        (async () => {
            /*
            var digits = 20n;

            if (!args[0])
                digits = 120n;
            else
                digits += BigInt(parseInt(args[0]));

            let i = 1n;
            let x = 3n * (10n ** digits);
            let pi = x;
            while (x > 0) {
                x = x * i / ((i + 1n) * 4n);
                pi += x / (i + 2n);
                i += 2n;
                console.log("x: " + x)
                console.log("pi: " + pi)
                console.log("i: " + i)
            }
            pi /= 10n ** 20n;
            pi = "3." + pi.toString().slice(1);

            console.log(pi);
            console.log(digits - 20n + " digits of PI calculated.")
            */

            console.log("calculating..")

            let pi = 0;
            let s = performance.now();
            let lool = 0;
            for (let i = 1; i < parseInt(args[0]); i++) {
                pi += (1 / i) ** 2;
                //console.log(pi)
                if (Math.round(i/parseInt(args[0])*100) !== lool) {
                    lool = Math.round(i/parseInt(args[0])*100);
                    if (lool % 10 === 0) {
                        console.log(lool + "%")
                    }
                }
                
            }
            let e = performance.now();

            console.log("pi: " + Math.sqrt(pi * 6))
            console.log(bot.findLatency(s, e))
            
        })();
    }
}