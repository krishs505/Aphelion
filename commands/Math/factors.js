const { bot } = require("../../exports")

module.exports = {
    name: 'factors',
    description: 'Calculate all the factors of a number.',
    aliases: ['fs'],
    usage: '<integer>',
    cooldown: 0,
    execute(message, args) {
        (async () => {
            if (!args[0]) return message.channel.send('Please include a number!');

            var strNum = bot.removeCommas(args[0]);
            var num = parseInt(strNum);

            if (num > 10000000000 && !bot.isKihei(message.author.id)) return message.channel.send('Numbers above 10,000,000,000 are not permitted to be calculated!');
            if (Number.isInteger(strNum)) return message.channel.send(args[0] + ' is not an integer!');

            var factors = [];
            var lat = 0;
            
            // console.log(`Estimated time: ${bot.estimateFactorsTime(num)}`);

            // for (var i = 0; i < args[1]; i++) {
                var s = performance.now();
                factors = bot.findFactors(num);
                var e = performance.now();
                lat += (e - s);
            // }
            // console.log(`${args[1]} tests run in ${lat}ms.\nAverage speed: ${lat / parseInt(args[1])}ms`);
            // console.log("--");

            factors = factors.sort(function(a,b) { return a-b }).join(", ");
            var latency = "\n\n" + bot.findLatency(s, e);

            var msg = `Factors of **${strNum}**:\n${factors}${latency}`;
            if (msg.length >= 2000) {
                await message.channel.send(`Factors of **${strNum}**:\nExceeds Discord message length limit!${latency}`);
                console.log(`Factors of **${strNum}**:\n${factors}${latency}`);
            } else {
                await message.channel.send(msg);
            }

            /*
            var check = true;
            if (factors.length !== factors2.length) {
                check = false;
                console.log('leng')
                return;
            }
            for (var i = 0; i < factors.length; i++) {
                if (factors[i] !== factors2[i]) {
                    console.log('diff!')
                    check = false;
                }
            }
            
            if (!check)
                await message.channel.send(':x: Resulted different factors!');
            else
                await message.channel.send(':white_check_mark: Resulted same factors!');*/

            
            
        })();
    }
}