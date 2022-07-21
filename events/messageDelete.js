const { bot } = require("../exports");
const Discord = require('discord.js');

module.exports = {
    name: 'messageDelete',
    execute(messageo) {
        (async () => {
            if (messageo.channel.type === 'dm') return
            if (messageo.author.bot) return;

            var MLC;
            var MLC2;
            var ns = false;

            if (messageo.guild.id == '447561485674348544') {
                MLC = messageo.client.channels.cache.get('935221827930820699');
                MLC2 = messageo.client.channels.cache.get('916920967937286164');
            } else return

            if (messageo.author.id === '252980043511234560' || messageo.channel.id === '751565931746033745' || messageo.channel.id === '806331336616706063') ns = true;

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
            var embed = new Discord.EmbedBuilder()
                .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL() })
                .setColor('0xBA1206')
                .setDescription(dts)
                .setTimestamp();
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
        })()
    }
};