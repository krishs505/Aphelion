const { bot } = require("../../exports")
const wait = require('util').promisify(setTimeout);

module.exports = {
    name: 'ghostping',
    description: 'Ghost ping a user!',
    aliases: ['gp', 'ghost'],
    usage: '[user mention / ID]',
    cooldown: 0,
    od: true,
    execute(message, args) {
        (async () => {
            if (!args[0]) return message.channel.send('You must include a user to ping!')

            await message.delete().catch(a => {});
            await message.channel.send(`<@!${args[0].trim().replace('<', '').replace('@', '').replace('!', '').replace('>', '')}>`).then(msg => { msg.delete().catch(a => {}); })
        })();
    }
}