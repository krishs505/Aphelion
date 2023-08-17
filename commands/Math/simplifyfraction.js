const { bot } = require("../../exports")

module.exports = {
    name: 'simplifyfraction',
    description: 'Simplify a fraction.',
    aliases: ['simplifyfrac', 'simplify', 'sf'],
    usage: '<numerator>/<denominator>',
    cooldown: 0,
    execute(message, args) {
        (async () => {
            if (!args[0]) return message.channel.send('Please provide a fraction!');

            var frac;

            if (args[0].includes('/')) { //  3/6
                frac = args[0].split('/');
            } else {
                if (!args[1]) return message.channel.send('That is not a valid fraction!');

                if (args[1] === '/') { //  3 / 6
                    frac = [args[0], args[2]];
                } else { //  3 6
                    frac = [args[0], args[1]];
                }
            }
            
            var num = frac[0];
            var den = frac[1];

            if (isNaN(num) || isNaN(num) || !Number.isInteger(parseInt(num)) || !Number.isInteger(parseInt(den))) return message.channel.send('That is not a valid fraction!');

            num = parseInt(num);
            den = parseInt(den);

            var dfq = bot.disallowFactorsOfQuadrillion(num + den, message);
            if (dfq) return
            if (num % den === 0) return message.channel.send(`Result: **${num / den}**`);

            //const processing = await message.channel.send('<a:loading_forever:822539925786329149> Processing...')
            var s = performance.now();

            //for (var i = 0; i < bot.in(args[1]); i++) {
                var result = bot.simplifyFraction(num, den);
            //}

            var e = performance.now();

            /*
            var factorsN = bot.findFactors(num).sort(function(a,b) { return a-b });
            var factorsD = bot.findFactors(den).sort(function(a,b) { return a-b });
            let gcf = -1;

            if (num < den) {
                for (let i = factorsN.length - 1; i >= 0; i--) {
                    if (factorsD.includes(factorsN[i])) {
                        gcf = factorsN[i];
                        break;
                    }
                }
            } else {
                for (let i = factorsD.length - 1; i >= 0; i--) {
                    if (factorsN.includes(factorsD[i])) {
                        gcf = factorsD[i];
                        break;
                    }
                }
            }
            
            //console.log("gcf: " + gcf)
            //console.log(factorsN)
            //console.log(factorsD)

            var e = performance.now();

            var newNum = num / gcf;
            var newDen = den / gcf;
            var result = `**${newNum}/${newDen}**`;
            if (newNum / newDen > 1) {
                result = `**${newNum}/${newDen}** or **${Math.round(newNum / newDen)} ${newNum % newDen}/${newDen}**`;
            }
            */
            await message.channel.send(`Result: ${result}\n${bot.findLatency(s, e)}`);
            //console.log((e - s) / bot.in(args[1]))
            
            //processing.delete().catch(a => {});
        })();
    }
}