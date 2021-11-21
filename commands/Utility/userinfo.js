const { bot } = require('../../index.js');
const Discord = require('discord.js');

module.exports = {
    name: 'userinfo',
    usage: '[user ID/mention]',
    aliases: ['user', 'member', 'memberinfo', 'fetchuser', 'fetch'],
    cooldown: 2,
    description: 'Get info about any user or guild member using their ID / mention.',
    execute(message, args) {
        (async () => {
            if (!bot.isChick3n(message.author.id)) return
            
            let member;
            if (!args[0]) {
                member = message.guild.members.cache.get(message.author.id);
            } else {
                member = message.guild.members.cache.get(args[0].trim().replace('<', '').replace('@', '').replace('!', '').replace('>', ''));
            }
            let user;
            let type = 'member';
            if (!member) {
                try {
                    user = await message.client.users.fetch(args[0].trim().replace('<', '').replace('@', '').replace('!', '').replace('>', ''));
                    type = 'user';
                } catch {
                    return message.channel.send('That user does not exist!')
                }
            }
            var embed;

            if (type === 'member') {
                var rm = member.roles.cache.sort((a, b) => b.position - a.position).map(r => r);
                var rm1 = rm.join(" ");
                if (rm1 === '@everyone') { rm1 = 'None'; } else { rm.pop(); rm1 = rm.join(" "); }
                if (rm1.length > 1024) rm1 = member.roles.cache.size;

                embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.user.username}#${member.user.discriminator}`, bot.getPFP(member.user))
                    .setThumbnail(bot.getPFP(member.user))
                    .setColor('#009dff')
                    .setDescription(`<@${member.user.id}>`)
                    .addField('Status', bot.getStatus(member))
                    .addField('User Creation Date', `${new Date(member.user.createdAt).toUTCString()}`)
                    .addField('Joined Server', `${new Date(member.joinedAt).toUTCString()}`)
                    .addField('Roles', rm1)
                    .setTimestamp(new Date().toISOString()).setFooter(`User ID: ${member.id}`);

                if (member.user.bot) { embed.addField('Is Bot', 'True') } else { embed.addField('Badges', `${bot.getBadges(member.user)}`) }
            } else if (type === 'user') {
                embed = new Discord.MessageEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, bot.getPFP(user))
                    .setThumbnail(bot.getPFP(user))
                    .setColor('#009dff')
                    .setDescription(`<@${user.id}>`)
                    .addField('User Creation Date', `${new Date(user.createdAt).toUTCString()}`)
                    .setTimestamp(new Date().toISOString()).setFooter(`User ID: ${user.id}`);

                if (user.bot) { embed.addField('Is Bot', 'True') } else { embed.addField('Badges', `${bot.getBadges(user)}`) }
            }

            await message.channel.send({ embeds: [embed] })
        })();
    },
};