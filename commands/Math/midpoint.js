module.exports = {
    name: 'midpoint',
    description: 'Calculate the midpoint between two points on a coordinate plane.',
    aliases: ['mpt'],
    usage: '<x1> <y1> <x2> <y2>',
    cooldown: 0,
    execute(message, args) {
        if (!args[0] || !args[1] || !args[2] || !args[3]) return message.channel.send('Please include all values for the syntax! Use +distance help for more information.')

        if (isNaN(args[0])) {
            return message.channel.send(':x: `' + args[0] + '` is not a number!');
        } else if (isNaN(args[1])) {
            return message.channel.send(':x: `' + args[1] + '` is not a number!');
        } else if (isNaN(args[2])) {
            return message.channel.send(':x: `' + args[2] + '` is not a number!');
        } else if (isNaN(args[3])) {
            return message.channel.send(':x: `' + args[3] + '` is not a number!');
        }

        var x1 = parseInt(args[0])
        var y1 = parseInt(args[1])
        var x2 = parseInt(args[2])
        var y2 = parseInt(args[3])

        message.channel.send(`Result: **(${(x1 + x2) / 2}, ${(y1 + y2) / 2})**`)
    }
}