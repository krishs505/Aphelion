module.exports = {
    name: 'cuberoot',
    description: 'Calculate the cube root of a number.',
    aliases: ['cbrt'],
    usage: '<integer>',
    cooldown: 0,
    execute(message, args) {
        message.channel.send('Result: **' + Math.cbrt(parseInt(args[0])) + '**');
    }
}