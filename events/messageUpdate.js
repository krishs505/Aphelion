const { bot } = require("../exports");
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'messageUpdate',
    execute(oldMessage, message) {
        (async () => {
            // f chain
            // if (!bot.isStaff(message.author.id) && message.channel.id === '934571108198387753' && message.content.toLowerCase() !== 'f') message.delete().catch(a => {});

            if (message.channel.type === 'dm') return
            if (message.author.bot) return;

            var MLC;
            var MLC2;
            var ns = false;

            if (message.guild.id == '447561485674348544') {
                MLC = message.client.channels.cache.get('935221827930820699');
                MLC2 = message.client.channels.cache.get('916920967937286164');
            } else return

            if (message.author.id === '252980043511234560' || message.channel.id === '751565931746033745' || message.channel.id === '806331336616706063') ns = true;

            const embed = new MessageEmbed()
                .setAuthor({ name: `${message.author.username}#${message.author.discriminator}`, iconURL: message.author.avatarURL() })
                .setColor('#b029ff')
                .setDescription(
                    `**Message sent by <@${message.author.id}> edited in <#${message.channel.id}>**: [Jump to Message](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`
                )
                .addFields({
                    name: 'Before:',
                    value: oldMessage.content,
                    inline: false,
                }, {
                    name: 'After:',
                    value: message.content,
                    inline: false,
                })
                .setTimestamp(new Date().toISOString()).setFooter({ text: `Message ID: ${message.id}` });

            MLC.send({ embeds: [embed] }).catch(a => { });
            if (ns === false) MLC2.send({ embeds: [embed] }).catch(a => { });
        })()
    }
};
