const { bot } = require("../../index");

function generateCode(length) {
    var r = [];
    var c = '0123456789'; // ABCDEFGHIJKLMNOPQRSTUVWXYZ -_=+,.<>/?;:[]{}!@#$%^&*()||`~
    for (var i = 0; i < length; i++) {
        r.push(c.charAt(Math.floor(Math.random() * c.length)));
    }
    return r.join('');
}

module.exports = {
    name: 'speedtest',
    description: "Computer attempts to guess a randomly generated code in the fastest speed possible.",
    usage: '<code length>',
    aliases: ['st'],
    cooldown: 0,
    od: true,
    execute(message, args) {
        (async () => {

            if (!args[0]) return message.channel.send('Please include the code length!');
            if (isNaN(args[0])) return message.channel.send('Please give a valid code length!')
            
            var code = generateCode(parseInt(args[0]));

            const processing = await message.channel.send(`<a:loading_forever:822539925786329149> Trying to find code \`${code}\``);

            var not = 1000000;
            var tc;
            var done = false;
            var tests;

            for (var i = 0; i < not; i++) {
                tc = generateCode(parseInt(args[0]));
                // console.log(parseInt(i / not * 100));
                // console.log(tc);

                if (tc === code) {
                    done = true;
                    tests = i;
                    break;
                }
            }
            
            if (done) {
                const sent = await message.channel.send(`Successfully found code \`${code}\` in ${tests} tests!`);

                const latency = sent.createdTimestamp - message.createdTimestamp;
                if (latency > 1000) {
                    message.channel.send('Time Taken: **' + latency / 1000 + ' seconds**');
                } else {
                    message.channel.send('Time Taken: **' + latency + 'ms**');
                }
            } else {
                message.channel.send(`:x: Failed to find the code in \`${not}\` tests! Try increasing the number.`)
            }
            

            processing.delete();
        })();
    }
}