const { BotDev, BotName, BotSupportLink, client } = require("../../index")
const Discord = require('discord.js')

module.exports = {
    name: 'botinfo',
    description: 'Displays some information about the bot.',
    aliases: ['info'],
    usage: ' ',
    cooldown: 0,
    execute(message) {
        message.channel.send('__**' + BotName + '**__\n\n**Developer:** ' + BotDev + '\n**Date of Creation:** March 19, 2021\n**Number of Servers:** ' + client.guilds.cache.size + '\n**Hosted on:** Chick3n\'s PC (for now!)\n**Programmed with:** Discord.js\n**Support Server:** ' + BotSupportLink);
    }
}