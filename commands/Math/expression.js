const { bot } = require("../../index")

module.exports = {
    name: 'expression',
    description: 'Solve an expression.',
    aliases: ['exp'],
    usage: '<expression>',
    cooldown: 0,
    execute(message, args) {
        (async () => {
            if (!args[0]) return message.channel.send('Please include an expression!');
            
            var exp = args.join("");

            

            message.channel.send(exp);
        })();
    }
}