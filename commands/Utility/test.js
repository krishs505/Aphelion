const { bot } = require("../../exports");
let fs = require('fs');
let writeText = require('add-text-to-image');
const path = require('path');
const Discord = require('discord.js');

module.exports = {
    name: 'test',
    description: "",
    usage: '',
    cooldown: 0,
    od: true,
    execute(message, args) {
        (async () => {

            /*let lol = 'qwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&*()_+-=[]|;":,./<>?';
            let msg = "";

            for (var i = 0; i < 30; i++) {
                for (var j = 0; j < 30; j++) {
                    msg += lol[bot.randomInt(0, lol.length - 1)];
                }
                msg += "\n";
            }*/

            ///////

            let lol = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890________________";
            let msg = "";

            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 50; j++) {
                    msg += lol[bot.randomInt(0, lol.length - 1)];
                }
                msg += "\n";
            }

            message.channel.send("```" + msg + "```")
            
            /*
            await message.channel.send("test").then(m => {
                setTimeout(() => {
                    m.delete().catch(() => {});
                }, 5000);
            })
            */

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

            message.channel.send(primes.join(", ") + "\n" + bot.findLatency(s, e));*/

            // ----------------------------------------------------------------------------

            /*fs.readFile('../../../../../../my stfu/txt/yessir.txt', 'utf8' , (err, data) => {
                if (err) {
                  console.error(err)
                  return
                }

                message.channel.send(data);
                // console.log(data)
            })*/

            //const folderPath = '../../../../../../Program Files/Google';
            
            //console.log(fs.readdirSync(folderPath));
        })();
    }
}