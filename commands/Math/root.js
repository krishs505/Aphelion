const { bot } = require("../../index")

module.exports = {
    name: 'root',
    description: 'Calculate the _th root of a number.',
    usage: '<root> <integer>',
    cooldown: 0,
    execute(message, args) {
        (async () => {
            if (parseInt(args[1]) > 25000000 && !bot.isChick3n(message.author.id)) {
                return message.channel.send('Sorry, but numbers above 25,000,000 are not permitted to be calculated as they slow down Aphelion for longer periods of time!')
            }
    
            let processing;
    
            if (!Number.isInteger(parseInt(args[0])) || parseInt(args[0]) < 2) {
                return message.channel.send('`' + args[0] + '` is not a valid root! Please enter 2 or higher.');
            } else if (isNaN(args[1])) {
                return message.channel.send('`' + args[1] + '` is not a valid number!');
            } else {
                processing = await message.channel.send('<a:loading_forever:822539925786329149> Processing...')
            }
    
            var num = args[1];
            var result = '';
            var roottype = '';
            var done = false;
    
            for (let i = 1; i <= num; i += 1) {
                if (Math.pow(i, args[0]) == num) {
                    if (result == '') {
                        result = i;
                        done = true;
                        break;
                    }
                }
            }
    
            switch (args[0]) {
                case '2':
                    roottype = 'square';
                    break;
                case '3':
                    roottype = 'cube';
                    break;
                case '4':
                    roottype = 'fourth';
                    break;
                case '5':
                    roottype = 'fifth';
                    break;
                case '6':
                    roottype = 'sixth';
                    break;
                case '7':
                    roottype = 'seventh';
                    break;
                case '8':
                    roottype = 'eighth';
                    break;
                case '9':
                    roottype = 'ninth';
                    break;
                case '10':
                    roottype = 'tenth';
                    break;
            }
    
            if (done) {
                if (result == '') {
                    message.channel.send('There is no ' + roottype + ' root of ' + num + '!');
                } else {
                    message.channel.send('The ' + roottype + ' root of ' + num + ' is **' + result + '**');
                }
    
                processing.delete();
    
                const latency = sent.createdTimestamp - message.createdTimestamp;
                if (latency > 1000) {
                    message.channel.send('Time Taken: **' + latency / 1000 + ' seconds**');
                } else {
                    message.channel.send('Time Taken: **' + latency + 'ms**');
                }
    
                done = false;
            }
        })();
    }
}