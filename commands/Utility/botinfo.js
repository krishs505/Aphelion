const { BotDev, BotName, DJSVersion, BotSupportLink } = require("../../config.js")

module.exports = {
    name: 'botinfo',
    description: 'Displays some information about the bot.',
    aliases: ['info'],
    usage: ' ',
    cooldown: 0,
    execute(message) {
        (async () => {
            var fetched = await message.client.users.fetch(BotDev);
            await message.channel.send(`__**${BotName}**__\n\n**Developer:** ${fetched.username}#${fetched.discriminator} (<@${BotDev}>)\n**Date of Creation:** March 19, 2021\n**Number of Servers:** ${client.guilds.cache.size}\n**Host:** Heroku\n**Discord.js Version:** ${DJSVersion}`);
        })();
    }
}