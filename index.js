const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS] });

/*** Settings ***/
let prefix = '+';
let BotName = 'Aphelion';
const DJSVersion = '13.6';
const BotSupportLink = 'https://discord.gg/';
const BotDev = '252980043511234560';

/* Token Handler (devMode) */
const { devMode, connectToMongo } = require('./config.json');
var token;
var MONGO_URI;
if (devMode) {
    const { dtoken, dMONGO_URI } = require('./dev-config.json');
    token = dtoken;
    MONGO_URI = dMONGO_URI;
    prefix += prefix;
    BotName += " Dev";
} else {
    token = process.env.TOKEN;
    MONGO_URI = process.env.MONGO_URI;
}

const { bot } = require('./exports');

// require('./invisdetection');

const fs = require('fs');
const mongoose = require('mongoose');
const data_store = require('data-store');
// const wait = require('util').promisify(setTimeout);

const Schema = require('./schemas/settings-schema');
const sID = '61d8b1ae44c5fc5637085070';

let settings = new data_store({ path: process.cwd() + '/settings.json' });

client.on('ready', async () => {
    if (connectToMongo) {
        await mongoose.connect(
            MONGO_URI,
            {
                keepAlive: true
            }
        ).then(async (mongoose) => {
            try {
                console.log('Connected to MongoDB!');
            } catch (error) {
                console.log(error);
            }
        })
    }

    console.log(`${BotName} is online! ${client.ws.ping}ms`);
    client.user.setPresence({ activities: [{ type: 'WATCHING', name: "Kihei's brain fry!" }], status: 'online' });
});

module.exports = {
    ws: client.ws,
    prefix: prefix,
    BotName: BotName,
    BotDev: BotDev,
    BotSupportLink: BotSupportLink,
    DJSVersion: DJSVersion
}

client.on('messageCreate', async message => {
    if (message.embeds.length !== 0) { // check if it's an embed
        try {
            if (message.channel.id === '916919202105946142' && // dyno messages log
            // check if it's my message OR from a manager channel and then delete
            (message.embeds[0].footer.text.includes('252980043511234560') || (message.embeds[0].description.includes('751565931746033745')) || message.embeds[0].description.includes('806331336616706063'))) {
                message.delete().catch(a => {});
            }
        } catch { }
    }

    //if (!bot.isStaff(message.author.id) && message.channel.id === '934571108198387753' && message.content.toLowerCase() !== 'f') message.delete().catch(a => {});

    if(message.author.id == '546340312713265173' && message.content.includes('with')) {
        var C = client.channels.cache.get('935221863553044500');
        C.send(message.content);
    }


    /*
    if (message.channel.id == '') {
        message.react("👍")
        message.react("👎")
    }

    if (message.author.id == '') {
        message.delete().catch(a => {});
    }

    if ((message.author.id == '572927730707071006' || message.author.id == '258265415770177536') && message.attachments.size > 0) {
        message.delete().catch(a => {});
    }
    */
});

client.on('messageUpdate', async (oldMessage, message) => {
    if (!bot.isStaff(message.author.id) && message.channel.id === '934571108198387753' && message.content.toLowerCase() !== 'f') message.delete().catch(a => {});
});

client.on('interactionCreate', async interaction => {

    const { commands } = client;
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
})

client.on('typingStart', async (channel, user) => {
    //console.log(`${user.username} is typing in channel #${channel.name} in a server!`);
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {

    if (newMember.nickname === null) return;

    if (newMember.id === '822456953501646849' && newMember.nickname !== 'Aphelion') newMember.setNickname('Aphelion');

    if (newMember.id !== '252980043511234560' && newMember.nickname.toLowerCase().includes('chick3n')) newMember.setNickname(newMember.user.username);

});

client.on('messageReactionRemove', async (reaction, user) => {

})

// Status Log
client.on('presenceUpdate', async (oldPresence, newPresence) => {

    if (devMode) return
    if (newPresence.guild.id !== '447561485674348544') return;
    if (newPresence.user.bot) return

    const s = await Schema.findById(sID);
    if (!s.statuses.length === 0) return

    var tracking = s.statuses;
    if (tracking[0] !== 'ta' && tracking.indexOf(newPresence.user.id) === -1) return

    var { user } = newPresence;
    try {
        var os = oldPresence.status;
        var ns = newPresence.status;
    } catch {
        return;
    }

    if (ns !== os) {
        var C = client.channels.cache.get('935221863553044500');
        var u = `<@${user.id}>`;
        if (user.id === '252980043511234560') u = '**Kihei**';
        var t = new Date();
        t = t.toString().replace('GMT-0400 (Eastern Daylight Time)', 'ET');
        t = t.toString().replace('GMT-0500 (Eastern Standard Time)', 'ET');
        C.send(`${u} | ${bot.getStatus(os)} **-->** ${bot.getStatus(ns)} | ${t}`);
    }
});

// Message Logs
client.on('messageDelete', async messageo => {
    if (messageo.channel.type === 'dm') return
    if (messageo.author.bot) return;

    var MLC;
    var MLC2;
    var ns = false;

    if (messageo.guild.id == '447561485674348544') {
        MLC = client.channels.cache.get('935221827930820699');
        MLC2 = client.channels.cache.get('916920967937286164');
    } else return

    if (messageo.author.id === '252980043511234560') ns = true;
    if (messageo.channel.id === '751565931746033745' || messageo.channel.id === '806331336616706063') ns = true;

    var message;
    var partial;

    if (!messageo.partial) {
        message = messageo;
        partial = false;
    }
    if (!message) return;
    var fp2 = '';
    if (!partial) {
        // Checks audit logs for the message deletor
        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_DELETE',
        });
        const auditEntry = fetchedLogs.entries.find(a =>
            // Small filter function to make use of the little discord provides to narrow down the correct audit entry.
            a.target.id === message.author.id &&
            a.extra.channel.id === message.channel.id &&
            // Ignore entries that are older than 20 seconds to reduce false positives.
            Date.now() - a.createdTimestamp < 2000
        );
        const executor = auditEntry ? auditEntry.executor : message.author;
        if (!executor || executor == undefined || !executor.tag || executor.tag == undefined) {
            fp2 = ` | Message Deletor: ${message.author.tag}`
        } else {
            fp2 = ` | Message Deletor: ${executor.tag}`
        }
    }

    // Checking for attachments/embeds + setting description
    var attachments = false;
    var dts = '';
    var tmt = `:\n${message.content}`;
    dts = `**Message sent by <@!${message.author.id}> deleted in <#${message.channel.id}>**${tmt}`;
    if (message.embeds.length > 0 || message.attachments.size > 0) {
        attachments = true;
        var et = ''
        if (message.embeds.length > 0) {
            et = `, as well as ${message.embeds.length} embed${bot.plural(message.embeds.length)}`
        }
        tmt = ` ${message.attachments.size} attachment${bot.plural(message.attachments.size)}${et}`;
        dts = `**Message with${tmt} by <@${message.author.id}> was deleted in <#${message.channel.id}>.**`;
        if (message.content != '' && message.content !== undefined && message.content !== null) {
            dts = `**Message with${tmt} by <@${message.author.id}> was deleted in <#${message.channel.id}>**:\n${message.content}`;
        }
    }

    // Get the attachment file(s)
    var aturl = `\n`;
    var aa = [];
    var ait = false;
    message.attachments.forEach((attachment) => {
        var fts = attachment.name.split('.');
        // do something with the attachment
        var sf = ['PNG', 'JPG', 'JPEG', 'WEBP', 'GIF', 'MP3', 'MP4']
        aturl += `\n[Attachment (${fts[fts.length - 1].toUpperCase().trim()} File, ${parseInt(attachment.size) / 1000000} MB)](${attachment.url})`;
        if (sf.indexOf(fts[fts.length - 1].toUpperCase().trim()) > -1) {
            aa.push(attachment.url);
        }
        ait = true;

    });

    if (!attachments && (message.content == '' || message.content == undefined || message.content == null || !message.content)) {
        dts = `**Message sent by <@!${message.author.id}> with a sticker was deleted in <#${message.channel.id}>.**`
    }

    // Set up embeds for launch!
    var foot;
    var embed = new MessageEmbed()
        .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL() })
        .setColor('0xBA1206')
        .setDescription(dts)
        .setTimestamp(new Date().toISOString());
    if (!partial) {
        foot = `Message ID: ${message.id}${fp2}`;
    }
    if (partial) {
        embed.setAuthor({ name: message.author.id });
        foot += ` | Partial Message (Not All Info Displayed)`;
    }
    embed.setFooter({ text: foot });

    if (ait) {
        // More setting up embeds..
        embed.setFields({
            name: `Attachment Link${bot.plural(message.attachments.size)} | Attachment Previews Also Shown Above`,
            value: aturl
        })
        embed.setFooter({ text: `Message ID: ${message.id}${fp2} | View or Download The Attachments/Images At Your Own Risk. | Partial Message (Not All Info Displayed)` });

        // Launch!
        MLC.send({
            embeds: [embed],
            files: aa
        }).catch(a => { });
        if (ns === false) {
            MLC2.send({
                embeds: [embed],
                files: aa
            }).catch(a => { });
        }
    } else {
        MLC.send({
            embeds: [embed]
        }).catch((a) => { });
        if (ns === false) {
            MLC2.send({
                embeds: [embed]
            }).catch((a) => { });
        }
    }
});
client.on('messageUpdate', async function (oldMessage, message) {
    if (message.channel.type === 'dm') return
    if (message.author.bot) return;

    var MLC;
    var MLC2;
    var ns = false;

    if (message.guild.id == '447561485674348544') {
        MLC = client.channels.cache.get('935221827930820699');
        MLC2 = client.channels.cache.get('916920967937286164');
    } else return

    if (message.author.id === '252980043511234560') ns = true;
    if (message.channel.id === '751565931746033745' || message.channel.id === '806331336616706063') ns = true;

    const embed = new MessageEmbed()
        .setAuthor({ name: `${message.author.username}#${message.author.discriminator}`, iconURL: message.author.avatarURL() })
        .setColor('#b029ff')
        .setDescription(
            `**Message sent by <@${message.author.id}> edited in <#${message.channel.id}>**: [Jump to Message](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`
        )
        .addFields({
            name: 'Before:',
            value: oldMessage.content,
            inline: false,
        }, {
            name: 'After:',
            value: message.content,
            inline: false,
        })
        .setTimestamp(new Date().toISOString()).setFooter({ text: `Message ID: ${message.id}` });

    MLC.send({ embeds: [embed] }).catch(a => { });
    if (ns === false) MLC2.send({ embeds: [embed] }).catch(a => { });
});

// Store commands in a Collection
client.commands = new Collection();
client.cooldowns = new Collection();
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

// Command Handler
client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return

    const {
        cooldowns
    } = client;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0) * 1000;

    if (timestamps.has(message.author.id) && !bot.isKihei(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
        }
    }

    timestamps.set(message.author.id, now);
    (() => timestamps.delete(message.author.id), cooldownAmount);

    if (!bot.isKihei(message.author.id)) {
        if (!command.odp) {
            if (command.od) return
        } else if (message.author.id !== '457643046268436482') return
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.log(error);
        message.channel.send('There was an error trying to execute that command!');
    }
});

client.login(token);
