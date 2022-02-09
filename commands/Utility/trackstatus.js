const { bot } = require("../../index");

const Schema = require('../../schemas/settings-schema');
const ID = '61d8b1ae44c5fc5637085070';

module.exports = {
    name: 'trackstatus',
    description: 'Track the status of user(s)!',
    aliases: ['ts'],
    cooldown: 0,
    od: true,
    execute(message, args) {
        (async () => {

            const s = await Schema.findById(ID);
            var C = message.client.channels.cache.get('935221863553044500');

            if (!args[0]) {
                if (s.statuses.length === 0) return message.channel.send("No users are being status tracked!");
                if (s.statuses[0] === 'ta') return message.channel.send("All users are being status tracked!");
                return message.channel.send(`**The following users are being status tracked:**\n- <@${s.statuses.join('>\n- <@')}>`);
            }

            if (args[0] === 'remove') {

                var ids = args;
                ids.shift();

                for (var i = 0; i < ids.length; i++) {
                    await Schema.findByIdAndUpdate(ID, { $pull: { statuses: ids[i] }, });
                }

                await message.channel.send(`Successfully removed <@${ids.join('> <@')}> from the status tracking!`);
                C.send(`\`Removed\` <@${ids.join('> <@')}>.`);

            } else if (args[0].toLowerCase() === 'removeall' || args[0] === 'reset') {

                await Schema.findByIdAndUpdate(ID, { $pullAll: { statuses: s.statuses }, });
                await message.channel.send(`Successfully removed all users from status tracking!`);
                C.send(`\`Removed all users from status tracking.\``);

            } else if (args[0] === 'all') {

                await Schema.findByIdAndUpdate(ID, { $pullAll: { statuses: s.statuses }, });
                await Schema.findByIdAndUpdate(ID, { $push: { statuses: 'ta' }, });
                await message.channel.send(`Successfully status tracking all users!`);
                C.send(`\`Tracking all users.\``);

            } else {

                for (var i = 0; i < args.length; i++) {
                    await Schema.findByIdAndUpdate(ID, { $addToSet: { statuses: args[i] }, });
                }

                await message.channel.send(`Successfully added <@${args.join('> <@')}> to the status tracking!`);
                C.send(`\`Added\` <@${args.join('> <@')}>.`);

            }
        })();
    }
}