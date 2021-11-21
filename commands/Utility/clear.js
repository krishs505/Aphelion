const { bot } = require('../.././index.js')
const { prefix } = require('../.././config.json');

module.exports = {
    name: 'clear',
    usage: '[number of messages] <optional member>',
    aliases: ['c'],
    cooldown: 0,
    description: 'Clear a specified number of messages with this command.',
    oc: true,
    execute(message, args) {
        (async () => {
            if (!args[0]) return message.channel.send('Please provide a number of messages you would like to clear!');

            var ii = 0;
            var mi = 1;
            var mentionedMember;

            if (!args[1]) {
                if (isNaN(parseInt(args[0]))) return message.channel.send('Please provide a valid number of messages you would like to clear!');
                if (parseInt(args[0].trim()) > 100) return message.channel.send("I can only clear up to 100 messages!");
                message.channel.bulkDelete(parseInt(args[0]) + 1, true);
            } else {
                if (isNaN(parseInt(args[0]))) {
                    ii = 1;
                    mi = 0;
                }
                mentionedMember = message.guild.members.cache.get(args[mi].trim().replace('<', '').replace('@', '').replace('!', '').replace('>', ''));

                if (!mentionedMember) return message.channel.send(`That user does not exist! Make sure you provide their ID or mention!`);
                if (isNaN(parseInt(args[ii]))) return message.channel.send(`Please specify a valid number of messages you would like to clear! Usage: \`${prefix}clear [number of messages] [number of messages] <optional member>\`.`);
                if (parseInt(args[ii].trim()) > 100) return message.channel.send("I can only clear up to 100 messages!");

                await message.delete();
                await message.channel.messages.fetch({
                    limit: 100
                }).then((messages) => {
                    const filterBy = mentionedMember ? mentionedMember.id : message.client.user.id;
                    messages = messages.filter(m => m.author.id === filterBy).array().slice(0, parseInt(args[ii]));
                    message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
                }).catch(error => {
                    console.log(error);
                });
            }
        })();
    }
}