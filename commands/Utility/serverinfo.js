const { bot } = require('../../index.js');
const Discord = require('discord.js');

function month(int) {
    switch (int) {
        case 1: int = 'January'; break;
        case 2: int = 'February'; break;
        case 3: int = 'March'; break;
        case 4: int = 'April'; break;
        case 5: int = 'May'; break;
        case 6: int = 'June'; break;
        case 7: int = 'July'; break;
        case 8: int = 'August'; break;
        case 9: int = 'September'; break;
        case 10: int = 'October'; break;
        case 11: int = 'November'; break;
        case 12: int = 'December'; break;
    }
    
    return int
}

module.exports = {
    name: 'serverinfo',
    usage: ' ',
    aliases: ['serverstats', 'guildinfo', 'guildstats', 'server', 'guild'],
    cooldown: 2,
    description: 'Get information about the server the command is sent in.',
    od: true,
    execute(message, args) {
        (async () => {
            var guild;

            if (bot.isKihei(message.author.id) && args[0]) {
                try {
                    guild = message.client.guilds.cache.get(args[0]);
                } catch {
                    return message.channel.send("Guild doesn't exist!")
                }
                console.log(args[0])
                console.log(guild)
                // message.channel.send(guild.name)
            } else {
                guild = message.guild;

                
            }

            try {
                var embed;
                var avurl1 = guild.iconURL({ dynamic: true }).split('.');
                var fot = avurl1.pop();
                var avurl = avurl1.join('.').trim();
                var bc = guild.members.cache.filter(member => member.user.bot).size;
                var cA = guild.createdAt;

                let rm = guild.roles.cache.sort((a, b) => b.position - a.position).map(r => r);
                var rm1 = rm.join(" ");
                if (rm1 === '@everyone') { rm1 = 0; } else { rm.pop(); rm1 = rm.join(" "); }
                if (rm1.length > 1024) rm1 = guild.roles.cache.size;

                embed = new Discord.MessageEmbed()
                    .setTitle(guild.name)
                    .setThumbnail(`${avurl}.${fot}`)
                    .setColor('#009dff')
                    /*.addField('Member Count', guild.memberCount, true)
                    .addField('User Count', guild.memberCount - bc, true)
                    .addField('Bot Count', bc, true)
                    .addField('Server Owner', `<@${guild.ownerID}>`, true)
                    .addField('Server Created', `${month(cA.getMonth())} ${cA.getDate()}, ${cA.getFullYear()}`, true)
                    .addField('Region', guild.region, true)
                    .addField('Text Channels', guild.channels.cache.filter((c) => c.type === "text").size, true)
                    .addField('Voice Channels', guild.channels.cache.filter((c) => c.type === "voice").size, true)
                    .addField('Categories', guild.channels.cache.filter((c) => c.type === "category").size, true)
                    .addField('Online Users', guild.members.cache.filter(m => m.presence.status !== 'offline').size - guild.members.cache.filter(m => m.user.bot && m.presence.status !== 'offline').size, true)
                    .addField('Server Boosts', guild.premiumSubscriptionCount, true)
                    .addField('Roles', rm1)*/
                    .setTimestamp(new Date().toISOString()).setFooter({ text: `Guild ID: ${guild.id}` });
            } catch (error) {
                console.log(`${guild.name} just had an error running serverinfo!`)
                console.log(error);
                message.channel.send("Uh oh! There was an error displaying that information! Try contacting Aphelion Support if this problem persists.")
            }

            message.channel.send({ embeds: [embed] });
        })();
    },
};