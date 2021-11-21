const { bot } = require("../../index")

module.exports = {
    name: 'nick',
    description: 'Set a nickname of another user.',
    usage: ' ',
    cooldown: 0,
    oc: true,
    execute(message, args) {
        const member = message.guild.members.cache.get(message.mentions.users.first().id)
        args.shift()

        try {
            member.setNickname(args.join(' '))
        } catch {
            return message.channel.send("Failed. Uh oh! I cannot change that member's nickname as their role is higher than me!")
        }
    }
}