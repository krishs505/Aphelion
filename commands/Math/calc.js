const { bot } = require("../../exports")

module.exports = {
    name: 'calculate',
    description: 'Calculate your basic math (+, -, *, /, ^).',
    aliases: ['calc'],
    usage: '[num] [operator] [num]',
    cooldown: 0,
    execute(message, args) {
        if (!args[0] || !args[1] || !args[2]) {
            return message.channel.send('Please include all values for the syntax! Use +help calc for more information.')
        }

        if (isNaN(args[0])) {
            return message.channel.send(':x: `' + args[0] + '` is not a number!');
        } else if (isNaN(args[2])) {
            return message.channel.send(':x: `' + args[2] + '` is not a number!');
        }

        var result;

        switch (args[1]) {
            case '+':
                result = parseInt(args[0]) + parseInt(args[2])
                break;
            case '-':
                result = parseInt(args[0]) - parseInt(args[2])
                break;
            case '*':
                result = parseInt(args[0]) * parseInt(args[2])
                break;
            case '/':
                result = parseInt(args[0]) / parseInt(args[2])
                break;
            case '^':
                result = Math.pow(parseInt(args[0]), parseInt(args[2]))
                break;
        }

        message.channel.send(`Result: **${result}**`);
    }
}