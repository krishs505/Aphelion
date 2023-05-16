const { bot } = require("../../exports");

module.exports = {
    name: 'approxsqrt',
    description: 'Estimate the squareroot of a number.',
    usage: '<number>',
    cooldown: 0,
    aliases: ['asqrt'],
    execute(message, args) {
        (async () => {
            if (!args[0]) return message.channel.send('Please include a number!');

            /*if (parseInt(args[1]) > 25000000 && !bot.isKihei(message.author.id)) {
                return message.channel.send('Sorry, but numbers above 25,000,000 are not permitted to be calculated as they slow down Aphelion for longer periods of time!')
            }*/
    
            let processing;
    
            if (isNaN(parseInt(args[0]))) {
                return message.channel.send(`\`${args[0]}\' is not a valid number!`);
            } else {
                processing = await message.channel.send('<a:loading_forever:822539925786329149> Processing...')
            }

            let num = parseInt(args[0]);
            let result = 0;

            var s = performance.now();

            let low;
            let high;
            for (var i = num - 1; i > 0; i--) {
                if (Number.isInteger(Math.sqrt(i))) {
                    low = i;
                    break;
                }
            }
            for (var i = num + 1; i < num + 10000000; i++) {
                if (Number.isInteger(Math.sqrt(i))) {
                    high = i;
                    break;
                }
            }

            console.log(low)
            console.log(high)

            let ratio = (num - low) / (high - low)
            let r_ratio = parseFloat(ratio.toFixed(1))
            console.log("ratio: " + ratio)

            //lowRT = Math.sqrt(low)
            //highRT = Math.sqrt(high)

            console.log("Error:" + (Math.sqrt(num) - (Math.sqrt(low) + ratio)))

            lowGuess = Math.sqrt(low) + r_ratio - 0.05
            highGuess = lowGuess + 0.2
            console.log(lowGuess)
            console.log(highGuess)
            let dist;
            let closest_dist = 1000000;

            //let step = 0.000000001;
            let step = 0.000000001;
            
            for (var i = lowGuess; i <= highGuess; i += step) {
                //if ((i / (highGuess - lowGuess) === 0) {
                //    console.log(100 + "%")
                //}
                dist = Math.abs(num - Math.pow(i, 2));
                if (dist < closest_dist) {
                    closest_dist = dist;
                    result = i;
                }
            }

            var e = performance.now();

            processing.edit(`Approximated: **${result}** \n Actual: **${Math.sqrt(num)}** \n ${bot.findLatency(s, e)}`).catch(a => {});

        })();
    }
}