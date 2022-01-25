const { prefix } = require('../../config.json');
const { Client, Intents, MessageActionRow, MessageSelectMenu } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const Discord = require('discord.js')
const fs = require('fs');
let data_store = require('data-store');
const { bot } = require('../../index');
let settings = new data_store({ path: process.cwd() + '/settings.json' });

module.exports = {
	name: 'help',
	description: 'Lists all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const { commands } = message.client;

		if (!args[0]) {
			var e = new Discord.MessageEmbed()
				.setTitle(`Help`)
				.setDescription(`There are different categories for different types of commands.\n\n**Select a category in the dropdown menu below** OR **send \`${prefix}help [command name]\` to get info on a specific command!**`)
				.setColor('#009dff')
				.setTimestamp(new Date().toISOString());

			const row = new MessageActionRow()
				.addComponents(
					new MessageSelectMenu()
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

			var e = new Discord.MessageEmbed()
                .setTitle(`Help - ${command.name}`)
                .setColor('#009dff')
                .setTimestamp(new Date().toISOString());

            if (command.description) e.addField('Description', command.description)
            if (command.usage) e.addField('Usage', `\`${prefix}${command.name} ${command.usage}\``)
            if (command.aliases) e.addField('Aliases', command.aliases.join(', '))

			message.channel.send({ embeds: [e] });
		}
	},
};