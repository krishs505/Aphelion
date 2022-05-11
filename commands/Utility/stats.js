const { bot } = require("../../exports");
const sSchema = require('../../schemas/server-data-schema');
const sID = "627af10e6146c4f52db2a862";

module.exports = {
    name: 'stats',
    description: " ",
    usage: ' ',
    cooldown: 5,
    od: true,
    execute(message, args) {
        (async () => {
            const data = await sSchema.findById(sID);
            let dat = data.date;

            await message.channel.send(`__**${dat[0]}/${dat[1]}/${dat[2]}**__\n\n# of messages: **${data.count}**`);
        })();
    }
}