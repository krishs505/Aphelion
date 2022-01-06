const { bot } = require("../../index")

module.exports = {
    name: 'echo',
    description: 'Echoes a message the user sent.',
    aliases: ['e'],
    usage: ' ',
    cooldown: 0,
    od: true,
    execute(message, args) {
        message.channel.send(args.join(" "));
        message.delete();
    }
}