const { BotDev, BotName, DJSVersion, BotSupportLink } = require("../../index.js")

module.exports = {
    name: 'botinfo',
    description: 'Displays some information about the bot.',
    aliases: ['info'],
    usage: '',
    cooldown: 0,
    execute(message) {
        (async () => {
            var fetched = await message.client.users.fetch("252980043511234560"); // fetching in case I change name/dicriminator
            await message.channel.send(`__**${BotName}**__\n\n**Developer:** ${fetched.username}#${fetched.discriminator} (<@${BotDev}>)\n**Date of Creation:** March 19, 2021\n**Number of Servers:** ${message.client.guilds.cache.size}\n**Host:** Heroku\n**Discord.js Version:** ${DJSVersion}`);
        })();
    }
}