const { bot } = require("../../exports")

module.exports = {
    name: 'randomcode',
    description: 'Generate a random code.',
    aliases: ['rc'],
    usage: '[max characters]',
    cooldown: 0,
    execute(message, args) {
        if (!args[0]) return message.channel.send('Please include a max character limit!')
        if (isNaN(args[0])) return message.channel.send(':x: `' + args[0] + '` is not a number!');
        if (args[0] > 2000) return message.channel.send('**Too many characters!** (Discord 2000 character limit)')

        var result = [];
        var chars = '1234567890';
        var charsLength = chars.length;
        var s = '';
        if (args[1] === 'spaced') s = ' ';

        for (var i = 0; i <= args[0]; i++) {
            result.push(chars.charAt(Math.floor(Math.random() * charsLength)));
        }

        if (result.join(s).length > 2000) return message.channel.send('**Too many characters!** (Discord 2000 character limit)')
        message.channel.send(`${result.join(s)}`);
    }
}