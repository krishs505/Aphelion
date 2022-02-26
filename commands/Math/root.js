const { bot } = require("../../exports");

module.exports = {
    name: 'root',
    description: 'Calculate the _th root of a number.',
    usage: '<root> <integer>',
    cooldown: 0,
    execute(message, args) {
        (async () => {
            if (!args[0] || !args[1]) return message.channel.send('Please include the necessary values! See `+help root` for more info.');

            if (parseInt(args[1]) > 25000000 && !bot.isKihei(message.author.id)) {
                return message.channel.send('Sorry, but numbers above 25,000,000 are not permitted to be calculated as they slow down Aphelion for longer periods of time!')
            }
    
            let processing;
    
            if (!Number.isInteger(parseInt(args[0])) || parseInt(args[0]) < 2) {
                return message.channel.send('`' + args[0] + '` is not a valid root! Please enter 2 or higher.');
            } else if (isNaN(parseInt(args[1]))) {
                return message.channel.send('`' + args[1] + '` is not a valid number!');
            } else {
                processing = await message.channel.send('<a:loading_forever:822539925786329149> Processing...')
            }
    
            var rad = parseInt(args[1]); // radicand - the number under the root
            var index = parseInt(args[0]); // nth root
            var result;
            var roottype;

            result = Math.pow(rad, 1 / index);
            
            if (index === 2) {
                roottype = 'square';
            } else if (index === 3) {
                roottype = 'cube';
            } else {
                roottype = index + 'th';
            }

            if (!Number.isInteger(result)) {

                var factors = bot.findFactors(rad);
                var out;
                var inside;

                // console.log(factors);
                // console.log(bot.organizeFactors(bot.findFactors(rad)));

                for (var i = 0; i < factors.length - 1; i++) {
                    if (Number.isInteger(Math.pow(factors[i], 1 / index))) {
                        out = factors[i];
                        // console.log(factors[i]);
                    }
                }

                if (out !== 1) { // there is at least one perfect Nth root
                    var oF = bot.organizeFactors(factors);

                    var ind = oF[0].indexOf(out);
                    if (ind !== -1) { // number is in the left
                        inside = oF[1][ind];
                    } else {
                        inside = oF[0][oF[1].indexOf(out)];
                    }

                    out = Math.pow(out, 1 / index);

                    result.toString();
                    result = `${out}√${inside}** or **${result}...`;
                } else {
                    result += "...";
                }
            }

            message.channel.send(`The ${roottype} root of ${rad} is **${result}**`);
    
            processing.delete().catch(a => {});
    
            /*
            const latency = processing.createdTimestamp - message.createdTimestamp;
            if (latency > 1000) {
                message.channel.send('Time Taken: **' + latency / 1000 + ' seconds**');
            } else {
                message.channel.send('Time Taken: **' + latency + 'ms**');
            }
            */
            
            // console.log('------')
        })();
    }
}