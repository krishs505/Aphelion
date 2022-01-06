const { bot } = require("../../index");
const Discord = require('discord.js')

let data_store = require('data-store');
let settings = new data_store({ path: process.cwd() + '/settings.json' });

const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'votes',
    description: "Staff can view the total votes of the poll.",
    usage: ' ',
    // aliases: ['av', 'pfp', 'icon'],
    cooldown: 2,
    od: true,
    execute(message, args) {
        (async () => {
            // if (message.channel.id !== '806331336616706063' && message.channel.id !== '824157000190656532') return

            var lol = [];
            for(var i = 0; i < settings.get('users').length; i++) {
                lol.push(`<@${settings.get('users')[i]}>: ${settings.get('votes')[i]}`);
            }
            await message.channel.send(`__Current Votes__\n**13:00:** ${settings.get('13')}\n**23:00:** ${settings.get('23')}\n**24:00:** ${settings.get('24')}\n\n__User Votes__\n${lol.join('\n')}`)
        })();
    }
}