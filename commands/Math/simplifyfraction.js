const { bot } = require("../../index")

module.exports = {
    name: 'simplifyfraction',
    description: 'Calculate the common factors between two numbers.',
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

            if (num + den > 100000000 && !bot.isKihei(message.author.id)) return message.channel.send('Fractions (numerator + denominator) above 100,000,000 are not permitted to be calculated as they slow down Aphelion for longer periods of time!');
            if (num % den === 0) return message.channel.send(`Result: **${num / den}**`);

            var factors = [];
            var cf = [];

            const processing = await message.channel.send('<a:loading_forever:822539925786329149> Processing...')

            var s = Date.now();
            for (let i = 1; i <= num; i++) {
                if (num % i === 0) {
                    factors.push(i);
                }
            }

            for (let i = 1; i <= den; i++) {
                if (den % i === 0 && factors.indexOf(i) !== -1) {
                    cf.push(i);
                }
            }
            var e = Date.now();

            var gcf = cf[cf.length - 1];
            var newNum = num / gcf;
            var newDen = den / gcf;
            var result = `**${newNum}/${newDen}**`;
            if (newNum / newDen > 1) {
                result = `**${newNum}/${newDen}** or **${Math.round(newNum / newDen)} ${newNum % newDen}/${newDen}**`;
            }

            await message.channel.send(`Result: ${result}\n${bot.findLatency(s, e)}`);
            
            processing.delete();
        })();
    }
}