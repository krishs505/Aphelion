const { prefix } = require("../index");
const { bot } = require("../exports");
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        (async () => {
            console.log('test');
            const { commands } = interaction.client;
            const categoryCommands = [];

            var IL = bot.isLab(interaction);

            function row(d1, d2, d3, d4) {
                return new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('leftMHelp')
                            .setLabel('⏮️')
                            .setStyle('PRIMARY')
                            .setDisabled(d1),
                        new MessageButton()
                            .setCustomId('leftHelp')
                            .setLabel('⬅️')
                            .setStyle('PRIMARY')
                            .setDisabled(d2),
                        new MessageButton()
                            .setCustomId('rightHelp')
                            .setLabel('➡️')
                            .setStyle('PRIMARY')
                            .setDisabled(d3),
                        new MessageButton()
                            .setCustomId('rightMHelp')
                            .setLabel('⏭️')
                            .setStyle('PRIMARY')
                            .setDisabled(d4)
                    )
            }

            if (interaction.isSelectMenu() && interaction.customId === 'selectHelp') {

                fs.readdirSync(`./commands/${interaction.values[0]}`).filter(file => file.endsWith('.js')).forEach(cf => {
                    var n = cf.replace('.js', '');
                    var cmd = commands.get(n) || commands.find(c => c.aliases && c.aliases.includes(n));
                    if (!IL && (cmd.od || cmd.odp)) return
                    categoryCommands.push(cmd);
                });

                var command = categoryCommands[0];

                var e = new MessageEmbed()
                    .setTitle(`${interaction.values[0]} - ${command.name}`)
                    .setColor('#009dff')
                    .setFooter({ text: `1/${categoryCommands.length}` });

                if (command.description) e.addField('Description', command.description)
                if (command.usage) e.addField('Usage', `\`${prefix}${command.name} ${command.usage}\``)
                if (command.aliases) e.addField('Aliases', command.aliases.join(', '))

                await interaction.update({ embeds: [e], components: [row(true, true, false, false)] });

            } else if (interaction.isButton()) {

                var id = interaction.customId;

                if (id === 'rightHelp' || id === 'leftHelp' || id === 'leftMHelp' || id === 'rightMHelp') {

                    fs.readdirSync(`./commands/${interaction.message.embeds[0].title.split(' ')[0]}`).filter(file => file.endsWith('.js')).forEach(cf => {
                        var n = cf.replace('.js', '');
                        var cmd = commands.get(n) || commands.find(c => c.aliases && c.aliases.includes(n));
                        if (!IL && (cmd.od || cmd.odp)) return
                        categoryCommands.push(cmd);
                    });

                    var lcn; // LAST COMMAND'S NUMBER
                    var e;

                    if (interaction.customId === 'rightHelp') {
                        lcn = parseInt(interaction.message.embeds[0].footer.text.split('/')[0]);
                    } else if (interaction.customId === 'leftHelp') {
                        lcn = parseInt(interaction.message.embeds[0].footer.text.split('/')[0]) - 2;
                    } else if (interaction.customId === 'leftMHelp') {
                        lcn = 0;
                    } else if (interaction.customId === 'rightMHelp') {
                        lcn = categoryCommands.length - 1;
                    } else return;

                    var command = categoryCommands[lcn];

                    e = new MessageEmbed()
                        .setTitle(`${interaction.message.embeds[0].title.split(' ')[0]} - ${command.name}`)
                        .setColor('#009dff')
                        .setFooter({ text: `${lcn + 1}/${categoryCommands.length}` });

                    if (command.description) e.addField('Description', command.description)
                    if (command.usage) e.addField('Usage', `\`${prefix}${command.name} ${command.usage}\``)
                    if (command.aliases) e.addField('Aliases', command.aliases.join(', '))

                    var bts = row(false, false, false, false);
                    if (lcn + 1 === categoryCommands.length) bts = row(false, false, true, true);
                    if (lcn === 0) bts = row(true, true, false, false);

                    await interaction.update({ embeds: [e], components: [bts] });

                }
            }
        })()
    }
}