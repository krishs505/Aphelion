const { bot } = require("../../index")

module.exports = {
    name: 'factors',
    description: 'Calculate all the factors of a number.',
    aliases: ['fs'],
    usage: '<integer>',
    cooldown: 0,
    execute(message, args) {
        (async () => {
            if (parseInt(args[0]) > 100000000 && !bot.isKihei(message.author.id)) return message.channel.send('Sorry, but numbers above 100,000,000 are not permitted to be calculated as they slow down Aphelion for longer periods of time!');
            if (!args[0]) return message.channel.send('Please include a number!');
            if (Number.isInteger(args[0])) return message.channel.send(args[0] + ' is not an integer!');

            const processing = await message.channel.send('<a:loading_forever:822539925786329149> Processing...');
            var num = parseInt(args[0]);
            var factors = [];
            var factors2 = [];

            /*var s = Date.now();
            // factors = bot.findFactorsProgress(num);
            for (let i = 1; i <= num; i++) {
                if (num % i === 0) factors.push(i);
            }
            var e = Date.now();*/

            var s2 = Date.now();
            factors2 = bot.findFactorsNew(num);
            var e2 = Date.now();

            // await message.channel.send(`Factors of **${args[0]}**:\n${factors.join(", ")}\n${bot.findLatency(s, e)}`);
            await message.channel.send(`Factors 2.0 of **${args[0]}**:\n${factors2.join(", ")}\n${bot.findLatency(s2, e2)}`);

            await processing.delete().catch(a => {});

            /*var check = true;

            if (factors.length !== factors2.length) {
                check = false;
                console.log('leng')
                return;
            }

            for (var i = 0; i < factors.length; i++) {
                if (factors[i] !== factors2[i]) {
                    check = false;
                }
            }
            
            if (check === false)
                await message.channel.send(':x: Resulted different factors!');
            else
                await message.channel.send(':white_check_mark: Resulted same factors!');*/
            
        })();
    }
}