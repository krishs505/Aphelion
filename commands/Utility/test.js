const { bot } = require("../../index");
const Discord = require('discord.js')

const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'test',
    description: " ",
    usage: ' ',
    // aliases: ['av', 'pfp', 'icon'],
    cooldown: 0,
    od: true,
    execute(message, args) {
        (async () => {

            var row1 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('13')
                        .setLabel('13:00')
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setCustomId('23')
                        .setLabel('23:00')
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setCustomId('24')
                        .setLabel('24:00')
                        .setStyle('PRIMARY'),
                );
            var row2 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('18')
                        .setLabel('18:00')
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setCustomId('22')
                        .setLabel('22:00')
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setCustomId('23')
                        .setLabel('23:00')
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setCustomId('24')
                        .setLabel('24:00')
                        .setStyle('PRIMARY'),
                );

            
            // await message.channel.send({ content: "**They are all in EST (UTC-5). Please convert them to your timezone.**", components: [row1] });
        })();
    }
}