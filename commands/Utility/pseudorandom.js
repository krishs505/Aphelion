const { bot } = require("../../index");

module.exports = {
    name: 'pseudorandom',
    description: "Generate a pseudorandom number using my custom PRNG script.",
    usage: ' ',
    aliases: ['random', 'prng'],
    cooldown: 0,
    od: true,
    execute(message, args) {
        (async () => {

            // var input = parseInt(args[0]);
            var s = Date.now();
            var now = Date.now().toString();
            var input = parseInt(now.substring(now.length - 3));

            if (input < 100) {
                console.log('LOW SEED DETECTED: ' + input.toString());
                input = Math.pow(input + 100, 2);
            }

            var output = input.toString(2);
            var output1_2 = parseInt(parseInt(output), 2);
            var output2 = (output + "000").slice(3);
            var output3 = output.split('');
            var output4 = output2.split('');
            var output5 = "";

            for (var i = 0; i < output3.length; i++) {
                if (output3[i] === output4[i]) {
                    output5 += "0";
                } else {
                    output5 += "1";
                }
            }

            var output6 = parseInt(parseInt(output5), 2).toString();
            var result = (parseInt(output6.substring(output6.toString().length - 1)) + 1).toString(); // literally get the last digit and add 1 LOL
            var e = Date.now();

            message.channel.send(result);
            message.channel.send(`Seed: ${input}\nBinary (base2): ${output}\n(test) base2 -> base10: ${output1_2}\nShift: ${output2}\nXor: ${output5}\nResult (base2 -> base10): ${output6}`);
            console.log('---');
            
        })();
    }
}