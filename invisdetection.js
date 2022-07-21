// needs to be updated - doesn't use event handler
/*
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
let data_store = require('data-store');
let iu = new data_store({ path: process.cwd() + '/invisusers.json' });
const C = '877797939538452511';

function pfp(user) {
    var avurl1 = user.displayAvatarURL({ dynamic: true }).split('.');
    var fot = avurl1.pop();
    var avurl = avurl1.join('.').trim();
    return `${avurl}.${fot}`;
}
function ICAE(user, description, info) { // Invis Check and Execute
    if (user.presence.status === 'offline' && !iu.hasOwn(user.id)) {
        iu.set(user.id, user.username);
        var d = `<@${user.id}> **${description}** while invisible!`;
        if (info) d += `\n\n${info}`;
        client.channels.cache.get(C).send(new Discord.EmbedBuilder().setTitle('Invisible User Detected!').setThumbnail(pfp(user)).setColor('#a1a1a1').setDescription(d));
    }
}

client.on('presenceUpdate', async (oldPresence, newPresence) => {
    var { user } = newPresence;
    if (iu.hasOwn(user.id) && newPresence.status !== "invisible") {
        iu.del(user.id);
        client.channels.cache.get(C).send(new Discord.EmbedBuilder().setThumbnail(pfp(user)).setColor('#a1a1a1').setDescription(`<@${user.id}> is no longer invisible!`));
    }
})

client.on('messageCreate', async (message) => {
    if (message.channel.type === 'dm') return
    ICAE(message.author, 'sent a message', `**Channel:** <#${message.channel.id}>\n\n[Jump to Message](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`);
})

client.on('typingStart', async (channel, user) => {
    ICAE(user, 'was typing', `**Channel:** <#${channel.id}>`);
})

client.on('messageReactionAdd', async (reaction, user) => {
    var { message } = reaction;
    if (message.channel.type === 'dm') return
    ICAE(user, 'reacted to a message', `**Channel:** <#${message.channel.id}>\n\n[Jump to Message](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`);
})

client.on('messageReactionRemove', async (reaction, user) => {
    var { message } = reaction;
    if (message.channel.type === 'dm') return
    ICAE(user, 'unreacted to a message', `**Channel:** <#${message.channel.id}>\n\n[Jump to Message](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`);
})

client.on('inviteCreate', async cinvite => {
    ICAE(cinvite.inviter, 'created an invite', `**Channel:** <#${cinvite.channel.id}>`);
})

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    if (newMember.user.username !== oldMember.user.username) ICAE(newMember.user, 'changed their name')
    if (newMember.user.avatar !== oldMember.user.avatar) ICAE(newMember.user, 'changed their profile picture')
})

client.on('guildMemberAdd', async member => {
    ICAE(member.user, 'joined the server');
})

client.on('guildMemberRemove', async member => {
    ICAE(member.user, 'left the server');
})

const { token } = require('./config.json');
// client.login(token);
*/