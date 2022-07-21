const { prefix } = require("../index");
const { bot } = require("../exports");
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        (async () => {
            const { commands } = interaction.client;
            const categoryCommands = [];

            var IL = bot.isLab(interaction);

            function row(d1, d2, d3, d4) {
                return new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('leftMHelp')
                            .setLabel('⏮️')
                            .setStyle('Primary')
                            .setDisabled(d1),
                        new Discord.ButtonBuilder()
                            .setCustomId('leftHelp')
                            .setLabel('⬅️')
                            .setStyle('Primary')
                            .setDisabled(d2),
                        new Discord.ButtonBuilder()
                            .setCustomId('rightHelp')
                            .setLabel('➡️')
                            .setStyle('Primary')
                            .setDisabled(d3),
                        new Discord.ButtonBuilder()
                            .setCustomId('rightMHelp')
                            .setLabel('⏭️')
                            .setStyle('Primary')
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

                var e = new Discord.EmbedBuilder()
                    .setTitle(`${interaction.values[0]} - ${command.name}`)
                    .setColor('#009dff')
                    .setFooter({ text: `1/${categoryCommands.length}` });

                if (command.description) e.addFields([ { name: 'Description', value: command.description }])
                if (command.usage) e.addFields([{ name: 'Usage', value: `\`${prefix}${command.name} ${command.usage}\`` }])
                if (command.aliases) e.addFields([{ name: 'Aliases', value: command.aliases.join(', ') }])

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

                    var lcn = null; // LAST COMMAND'S NUMBER
                    var e;

                    switch (interaction.customId) {
                        case 'rightHelp': lcn = parseInt(interaction.message.embeds[0].footer.text.split('/')[0]); break;
                        case 'leftHelp': lcn = parseInt(interaction.message.embeds[0].footer.text.split('/')[0]) - 2; break;
                        case 'leftMHelp': lcn = 0; break;
                        case 'rightMHelp': lcn = categoryCommands.length - 1; break;
                    }
                    if (lcn === null) return;

                    var command = categoryCommands[lcn];

                    e = new Discord.EmbedBuilder()
                        .setTitle(`${interaction.message.embeds[0].title.split(' ')[0]} - ${command.name}`)
                        .setColor('#009dff')
                        .setFooter({ text: `${lcn + 1}/${categoryCommands.length}` });

                    
                    if (command.description) e.addFields([ { name: 'Description', value: command.description }])
                    if (command.usage) e.addFields([{ name: 'Usage', value: `\`${prefix}${command.name} ${command.usage}\`` }])
                    if (command.aliases) e.addFields([{ name: 'Aliases', value: command.aliases.join(', ') }])
                    

                    var bts = row(false, false, false, false);
                    if (lcn + 1 === categoryCommands.length) bts = row(false, false, true, true);
                    if (lcn === 0) bts = row(true, true, false, false);

                    await interaction.update({ embeds: [e], components: [bts] });

                }
            }
        })()
    }
}