const { bot } = require("../../exports")

module.exports = {
    name: 'equation',
    description: 'Solve a single-variable equation.',
    aliases: ['eq'],
    usage: '<equation>',
    cooldown: 0,
    od: true,
    execute(message, args) {
        (async () => {
            if (!args[0]) return message.channel.send('Please include an equation!');

            var eq = args.join("");
            console.log(eq);

            var es = 0;
            for (var i = 0; i < eq.length; i++) {
                if(eq[i] === "=") es ++;
            }

            if (es > 1) return message.channel.send('Invalid equation!')

            var left = eq.split('=')[0];
            var right = eq.split('=')[1];

            for (var i = 0; i < left.length; i++) {
                
            }
        })();
    }
}