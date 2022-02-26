const { bot } = require("../../exports");
let fs = require('fs');
const path = require('path');

module.exports = {
    name: 'test',
    description: " ",
    usage: ' ',
    cooldown: 0,
    od: true,
    execute(message, args) {
        (async () => {
            if (!bot.isKihei(message.author.id)) return

            

            // ----------------------------------------------------------------------------
            
            /*var f = bot.organizeFactors(bot.findFactorsProgress(parseInt(args[0])));
            // console.log(f);
            var factors1;
            var factors2;
            var primes = [];

            var s = performance.now();
            for (var i = 0; i < f[0].length; i++) {
                factors1 = bot.findFactors(f[0][i]);
                factors2 = bot.findFactors(f[1][i]);
                console.log(factors1);
                console.log(factors2);
                console.log('---')

                if (factors1.length <= 2 && factors2.length <= 2) {
                    primes.push(f[0][i] + ' ' + f[1][i]);
                }
            }
            var e = performance.now();

            message.channel.send(primes.join(", ") + "\n" + bot.findLatency(s, e));

            // ----------------------------------------------------------------------------

            /*fs.readFile('../../../../../../my stfu/txt/yessir.txt', 'utf8' , (err, data) => {
                if (err) {
                  console.error(err)
                  return
                }

                message.channel.send(data);
                // console.log(data)
            })

            const folderPath = '../../../../../../Program Files/Google';
            
            // console.log(fs.readdirSync(folderPath));*/
        })();
    }
}