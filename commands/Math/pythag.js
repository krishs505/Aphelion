module.exports = {
    name: 'pythag',
    description: 'Calculate the hypotenuse of a triangle using the pythagorean theorum.',
    aliases: ['pt'],
    usage: '<a> <b>',
    cooldown: 0,
    execute(message, args) {
        if (!args[0] || !args[1]) {
            return message.channel.send('Please include all values for the syntax! Use +pythag help for more information.')
        }

        if (isNaN(args[0])) {
            return message.channel.send(':x: `' + args[0] + '` is not a number!');
        } else if (isNaN(args[1])) {
            return message.channel.send(':x: `' + args[1] + '` is not a number!');
        }

        var a = parseInt(args[0]);
        var b = parseInt(args[1]);

        var result = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

        message.channel.send('Result: Hypotenuse (C) = **' + result + '**')
    }
}