const { prefix } = require('../../index');
const Discord = require('discord.js');
const { bot } = require('../../exports');

module.exports = {
	name: 'help',
	description: 'Lists all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const { commands } = message.client;

		if (!args[0]) {
			var e = new Discord.EmbedBuilder()
				.setTitle(`Help`)
				.setDescription(`There are different categories for different types of commands.\n\n**Select a category in the dropdown menu below** OR **send \`${prefix}help [command name]\` to get info on a specific command!**`)
				.setColor('#009dff')
				.setTimestamp();

			const row = new Discord.ActionRowBuilder()
				.addComponents(
					new Discord.SelectMenuBuilder()
						.setCustomId('selectHelp')
						.setPlaceholder('Nothing selected')
						.addOptions([
							{
								label: 'Math',
								description: 'From simplifying fractions to factoring polynomials!',
								value: 'Math',
							},
							{
								label: 'Utility',
								description: 'General commands which can do a variety of things.',
								value: 'Utility',
							},
							/*{
								label: 'Games',
								description: "There's not much here yet.. but we do plan to add games!",
								value: '',
							},*/
						]),
				);

			message.channel.send({ embeds: [e], components: [row] });
		} else {
			var n = args[0].toLowerCase();
			var command = commands.get(n) || commands.find(c => c.aliases && c.aliases.includes(n));

			if (!command || ((command.od || command.odp) && !bot.isLab(message))) return message.channel.send("That's not a valid command!");

			var e = new Discord.EmbedBuilder()
                .setTitle(`Help - ${command.name}`)
                .setColor('#009dff')
                .setTimestamp();

            if (command.description) e.addFields([{ name: 'Description', value: command.description }])
            if (command.usage) e.addFields([{ name: 'Usage', value: `\`${prefix}${command.name} ${command.usage}\`` }])
            if (command.aliases) e.addFields([{ name: 'Aliases', value: command.aliases.join(', ') }])

			message.channel.send({ embeds: [e] });
		}
	},
};