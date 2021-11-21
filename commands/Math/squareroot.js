module.exports = {
    name: 'squareroot',
    description: 'Calculate the square root of a number.',
    aliases: ['sqrt'],
    usage: '<integer>',
    cooldown: 0,
    execute(message, args) {
        message.channel.send('Result: **' + Math.sqrt(parseInt(args[0])) + '**');
    }
}