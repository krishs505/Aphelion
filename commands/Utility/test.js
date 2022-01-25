const { bot } = require("../../index");
let fs = require('fs');
const path = require('path');

module.exports = {
    name: 'test',
    description: " ",
    usage: ' ',
    cooldown: 0,
    od: true,
    execute(message, args) {
        (async () => {
            if (!bot.isKihei(message.author.id)) return

            fs.readFile('../../../../../../my stfu/txt/yessir.txt', 'utf8' , (err, data) => {
                if (err) {
                  console.error(err)
                  return
                }

                message.channel.send(data);
                // console.log(data)
            })

            const folderPath = '../../../../../../Program Files/Google'
            
            // console.log(fs.readdirSync(folderPath));
        })();
    }
}