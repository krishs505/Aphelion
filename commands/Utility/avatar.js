const { bot } = require("../../exports");
const Discord = require('discord.js')

module.exports = {
    name: 'avatar',
    description: 'Get the avatar of a user with this command.',
    usage: '<user mention or ping>',
    aliases: ['av', 'pfp', 'icon'],
    cooldown: 2,
    execute(message, args) {
        (async () => {
            var user;
            if (!args[0]) {
                user = await message.client.users.fetch(message.author.id);
            } else {
                try {
                    user = await message.client.users.fetch(args[0].trim().replace('<', '').replace('@', '').replace('!', '').replace('>', ''));
                } catch {
                    return message.channel.send('That user does not exist!')
                }
            }

            var avurl1 = user.displayAvatarURL({
                dynamic: true
            }).split('.');
            var fot = avurl1.pop();
            var avurl = avurl1.join('.').trim();
            var ge = '';
            if (fot == 'gif')
                ge = ` | [GIF](${avurl}.gif)`;
    
            var te = new Discord.EmbedBuilder().setTitle("Avatar").setDescription(`Avatar of <@!${user.id}>:`).setImage(`${avurl}.${fot}`).addFields([{ name: 'Links', value: `[PNG](${avurl}.png) | [JPG](${avurl}.png) | [WEBP](${avurl}.webp)${ge}` }]).setColor('#0099FF').setAuthor({ name: user.tag, iconURL: avurl + '.' + fot }).setFooter({ text: 'We are not responsible for any content on the user\'s avatar.' });
            message.channel.send({ embeds: [te] });
        })();
    }
}