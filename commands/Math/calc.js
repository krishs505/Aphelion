const { bot } = require("../../exports")
const Discord = require("discord.js")

module.exports = {
    name: 'calculate',
    description: 'Calculate your basic math (+, -, *, /, ^).',
    aliases: ['calc'],
    usage: '[num] [operator] [num]',
    cooldown: 0,
    execute(message, args) {
        if (!args[0] || !args[1] || !args[2]) return message.channel.send('Please include all necessary values! Use +help calc for more information.')

        if (isNaN(args[0])) {
            return message.channel.send(':x: `' + args[0] + '` is not a number!');
        } else if (isNaN(args[2])) {
            return message.channel.send(':x: `' + args[2] + '` is not a number!');
        }

        var result;
        var n1 = parseFloat(args[0]);
        var n2 = parseFloat(args[2]);

        switch (args[1]) {
            case '+':
                result = n1 + n2
                break;
            case '-':
                result = n1 - n2
                break;
            case '*':
                result = n1 * n2;
                break;
            case '/':
                result = n1 / n2
                break;
            case '^':
                result = Math.pow(n1, n2)
                break;
        }

        message.channel.send(`Result: **${result}**`);
    }
}