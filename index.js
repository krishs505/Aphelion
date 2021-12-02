const Discord = require('discord.js');
const { Client, Intents, MessageActionRow, MessageButton } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS] });

var devMode = false;

const { MONGO_URI } = require('./config.json');
const config = require('./config.json');
var token = config.token;
var prefix = config.prefix;
if (devMode) { token = config.token; prefix = config.dprefix }

const fs = require('fs')
const wait = require('util').promisify(setTimeout);
// require('./invisdetection');

let data_store = require('data-store');
let settings = new data_store({ path: process.cwd() + '/settings.json' });

const mongoose = require('mongoose');
// require('dotenv').config();

const BotDev = 'Chick3n#0001';
var BotName = 'Aphelion';
if (devMode) BotName = 'Aphelion Dev';
const BotSupportLink = 'https://discord.gg/zJWVYmqfgv';

client.on('ready', async () => {
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

    console.log(BotName + ` is online!`);
    client.user.setPresence({ activities: [{ type: 'WATCHING', name: "Chick3n's brain fry!" }], status: 'online' });
});

var bot = {
    loadSettings: function () {
        settings = new data_store({ path: process.cwd() + '/settings.json' });
    },
    isChick3n: function (id) {
        if (id == '252980043511234560') {
            return true;
        } else return false
    },
    isDevTester: function (id) {
        if (id == '252980043511234560') {
            return true;
        } else return false
    },
    randomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    makeId: function (length) {
        var result = [];
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result.push(characters.charAt(Math.floor(Math.random() *
                charactersLength)));
        }
        return result.join('');
    },
    generateId: function () {
        return this.makeId(15);
    },
    plural: function (num) {
        if (parseInt(num) == 1) {
            return '';
        } else {
            return 's';
        }
    },
    getBadges: function (user) {
        var flags;
        var flags1 = '';
        try {
            flags = user.flags.toArray().join(', ');
        } catch {
            flags1 = 'None';
        }
        if (!flags) flags1 = 'None';

        if (flags1 !== 'None') {
            if (flags.includes('HOUSE_BRAVERY')) flags1 = flags1 + '<:Bravery:849751729674125312> ';
            if (flags.includes('HOUSE_BRILLIANCE')) flags1 = flags1 + '<:Brilliance:849751729754341427> ';
            if (flags.includes('HOUSE_BALANCE')) flags1 = flags1 + '<:Balance:849751729536761918> ';
            if (flags.includes('HYPESQUAD_EVENTS')) flags1 = flags1 + '<:Hypesquad_Events:849753779116441611> ';
            if (flags.includes('BUGHUNTER')) flags1 = flags1 + '<:BugHunter:849752606493507604> ';
            if (flags.includes('EARLY_VERIFIED_DEVELOPER') || flags.includes('VERIFIED_DEVELOPER')) flags1 = flags1 + '<:Early_Developer:849761396912291892> ';
            if (flags.includes('EARLY_SUPPORTER')) flags1 = flags1 + '<:Early_Supporter:849754395579121694> ';
        }
        if (user.displayAvatarURL({ dynamic: true }).endsWith('.gif') || user.discriminator < 5 || user.disciminator > 9990) flags1 = flags1 + '<:Nitro_Subscriber:849757959306608681>';

        return flags1;
    },
    getStatus: function (member) {
        var status = member.presence.status;
        switch (status) {
            case 'online': status = '<:online:912099878275022860> Online'; break
            case 'dnd': status = '<:dnd:912099878140801074> Do Not Disturb'; break
            case 'idle': status = '<:idle:912099878174359582> Idle'; break
            case 'offline': status = '<:offline:912099878111424583> Offline / Invisible'; break
        }
        return status;
    },
    getPFP: function (user) {
        var avurl1 = user.displayAvatarURL({ dynamic: true }).split('.');
        var fot = avurl1.pop();
        var avurl = avurl1.join('.').trim();
        return `${avurl}.${fot}`;
    },
}
module.exports = {
    bot: bot,
    cw: client.ws,
    client: client,
    BotDev: BotDev,
    BotName: BotName,
    BotSupportLink: BotSupportLink
};

client.on('messageCreate', async message => {
    // if ((message.channel.id === '587717563446722633' || message.channel.id === '837028805054562324') && message.embeds[0].footer.text.includes('252980043511234560')) message.delete();

    /*
    if (message.channel.id == '') {
        message.react("👍")
        message.react("👎")
    }

    if (message.author.id == '') {
        message.delete();
    }

    if ((message.author.id == '572927730707071006' || message.author.id == '258265415770177536') && message.attachments.size > 0) {
        message.delete();
    }
    */
});

client.on('interactionCreate', async interaction => {

    const { commands } = client;
    const categoryCommands = [];

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
            if (cmd.oc) return
            categoryCommands.push(cmd);
        });

        var command = categoryCommands[0];

        var e = new Discord.MessageEmbed()
            .setTitle(`${interaction.values[0]} - ${command.name}`)
            .setColor('#009dff')
            .setFooter(`1/${categoryCommands.length}`);

        if (command.description) e.addField('Description', command.description)
        if (command.usage) e.addField('Usage', `\`${prefix}${command.name} ${command.usage}\``)
        if (command.aliases) e.addField('Aliases', command.aliases.join(', '))

        await interaction.update({ embeds: [e], components: [row(true, true, false, false)] });

    } else if (interaction.isButton()) {

        var id = interaction.customId;
        var ids = ['13', '15', '16', '17', '18', '22', '23', '24']

        if (id === '13' || id === '15' || id === '16' || id === '17' || id === '18' || id === '22' || id === '23' || id === '24') {

            let settings = new data_store({ path: process.cwd() + '/settings.json' });

            var arr = settings.get('users');
            var votes = settings.get('votes');
            var pvi;
            var num = settings.get(id);
            /*if (arr.includes(interaction.user.id)) {
                pvi = arr.indexOf(interaction.user.id);
                votes[pvi] = id;

                var pnum = parseInt(settings.get(votes[pvi]));
                pnum--;
                num++;
                await settings.set(id, num);
                await settings.set(, pnum);
                await settings.set('votes', votes);

                return
            }*/
            
            if (arr.includes(interaction.user.id)) return

            // console.log(id);
            arr.push(interaction.user.id);
            settings.set('users', arr);

            votes.push(id);
            settings.set('votes', votes);

            num++;
            // console.log(num);
            await settings.set(id, num);

        }

        if (id === 'rightHelp' || id === 'leftHelp' || id === 'leftMHelp' || id === 'rightMHelp') {

            fs.readdirSync(`./commands/${interaction.message.embeds[0].title.split(' ')[0]}`).filter(file => file.endsWith('.js')).forEach(cf => {
                var n = cf.replace('.js', '');
                var cmd = commands.get(n) || commands.find(c => c.aliases && c.aliases.includes(n));
                if (cmd.oc) return
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

            e = new Discord.MessageEmbed()
                .setTitle(`${interaction.message.embeds[0].title.split(' ')[0]} - ${command.name}`)
                .setColor('#009dff')
                .setFooter(`${lcn + 1}/${categoryCommands.length}`);

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
    if (newMember.id === '822456953501646849' && newMember.nickname !== 'Aphelion') {
        newMember.setNickname('Aphelion')
    }
});

client.on('messageReactionRemove', async (reaction, user) => {

})

function status(status) {
    switch (status) {
        case 'online': status = '<:online:849769635296313374>'; break;
        case 'offline': status = '<:offline:849769635032465408>'; break;
        case 'idle': status = '<:idle:849769635007692810>'; break;
        case 'dnd': status = '<:dnd:849769635062874162>'; break;
    }
    return status;
}
client.on('presenceUpdate', async (oldPresence, newPresence) => {
    bot.loadSettings();
    if (!settings.hasOwn(`settings.status_log`)) return
    if (newPresence.user.bot) return
    if (newPresence.guild.id === '447561485674348544') {
        var { user } = newPresence;
        try {
            var os = oldPresence.status;
            var ns = newPresence.status;
        } catch {
            return;
        }

        if (ns !== os) {
            var C = client.channels.cache.get('860174499181101058');
            var u = `<@${user.id}>`;
            if (user.id === '252980043511234560') u = '**Chick3n**';
            var t = new Date();
            t = t.toString().replace('GMT-0400 (Eastern Daylight Time)', 'EDT')
            C.send(`${u} | ${status(os)} **-->** ${status(ns)} | ${t}`);
        }
    }
});

client.on('messageDelete', async messageo => {
    if (messageo.channel.type === 'dm') return
    if (messageo.author.bot) return;

    var MLC;
    var MLC2;
    var ns = false;

    if (messageo.guild.id == '447561485674348544') {
        MLC = client.channels.cache.get('844209098161258496');
        MLC2 = client.channels.cache.get('837028805054562324');
    } else return

    if (messageo.author.id === '252980043511234560') ns = true;

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
    var embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setColor('0xBA1206')
        .setDescription(dts)
        .setTimestamp(new Date().toISOString());
    if (!partial) {
        foot = `Message ID: ${message.id}${fp2}`;
    }
    if (partial) {
        embed.setAuthor(message.author.id);
        foot += ` | Partial Message (Not All Info Displayed)`;
    }
    embed.setFooter(foot);

    if (ait) {
        // More setting up embeds..
        embed.setFields({
            name: `Attachment Link${bot.plural(message.attachments.size)} | Attachment Previews Also Shown Above`,
            value: aturl
        })
        embed.setFooter(`Message ID: ${message.id}${fp2} | View or Download The Attachments/Images At Your Own Risk. | Partial Message (Not All Info Displayed)`);

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
        MLC = client.channels.cache.get('844209098161258496');
        MLC2 = client.channels.cache.get('837028805054562324');
    } else return

    if (message.author.id === '252980043511234560') ns = true;

    const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
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
        .setTimestamp(new Date().toISOString()).setFooter(`Message ID: ${message.id}`);

    MLC.send({ embeds: [embed] }).catch(a => { });
    if (ns === false) MLC2.send({ embeds: [embed] }).catch(a => { });
});

client.commands = new Discord.Collection()
client.cooldowns = new Discord.Collection()
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return

    if (command.onlychick3n && !bot.isChick3n(message.author.id)) return

    const {
        cooldowns
    } = client;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0) * 1000;

    if (timestamps.has(message.author.id) && !bot.isChick3n(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
        }
    }

    timestamps.set(message.author.id, now);
    (() => timestamps.delete(message.author.id), cooldownAmount);

    if (command.oc && !bot.isChick3n(message.author.id)) return

    try {
        command.execute(message, args);
    } catch (error) {
        console.log(error);
        message.channel.send('There was an error trying to execute that command!');
    }
})

client.login(token);