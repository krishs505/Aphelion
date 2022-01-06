const { bot, client } = require("../../index")
const Discord = require('discord.js')

module.exports = {
    name: 'servers',
    description: 'Displays the servers Aphelion is in.',
    aliases: ['avatar', 'icon'],
    usage: '[user mention]',
    cooldown: 0,
    execute(message) {
        if (!bot.isKihei(message.author.id)) return

        var servers = `**Aphelion is in **\`` + client.guilds.cache.size + `\`** servers!**`;

        client.guilds.cache.forEach((guild) => {
            servers = servers + `\n- ${guild.name} - ${guild.memberCount} members (${guild.id})`;
        })

        /*let g = client.guilds.cache.get('310481787807596544');
        let c = g.channels.cache.get('310481787807596545');
        g.channels.cache.forEach(c => {
            console.log(c.id);
        })
        c.createInvite().then(invite => {
            message.reply(invite.code)
        });*/

        message.channel.send(servers)
    }
}