const { bot } = require("../../exports")

module.exports = {
    name: 'equation',
    description: 'Solve an equation.',
    aliases: ['eq'],
    usage: '<equation>',
    cooldown: 0,
    execute(message, args) {
        (async () => {
            if (!args[0]) return message.channel.send('Please include an equation!');
            
            var eq = args.join("");
            message.channel.send(eq);
        })();
    }
}