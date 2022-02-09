const { bot } = require("../../index");
const Discord = require('discord.js')

module.exports = {
    name: 'crypto',
    description: 'Calculate crypto profits OR required selling price for a specified profit.',
    usage: '<user mention or ping>',
    // aliases: [],
    cooldown: 2,
    od: true,
    execute(message, args) {
        (async () => {
            const row = new MessageActionRow()
				.addComponents(
					new MessageSelectMenu()
						.setCustomId('selectHelp')
						.setPlaceholder('Nothing selected')
						.addOptions([
							{
								label: 'Profit Calculator',
								description: 'Input your investment and an initial + selling coin price!',
								value: 'profit',
							},
							{
								label: 'Required Sell Price',
								description: "Input your initial coin price and investment + profit amount.",
								value: 'req',
							},
						]),
				);
            
            
        })();
    }
}