const { bot } = require("../../exports");

module.exports = {
    name: 'servers',
    description: 'Displays the servers Aphelion is in.',
    aliases: ['avatar', 'icon'],
    usage: '[user mention]',
    cooldown: 0,
    od: true,
    execute(message) {
        var servers = `**Aphelion is in **\`` + message.client.guilds.cache.size + `\`** servers!**`;

        message.client.guilds.cache.forEach((guild) => {
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