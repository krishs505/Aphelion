const { bot } = require("../../exports");
//const ObjectsToCsv = require('objects-to-csv');
const fs = require('fs');

module.exports = {
    name: 'bjdata',
    description: ' ',
    usage: ' ',
    cooldown: 0,
    od: true,
    execute(message, args) {
        (async () => {
            if (args.length < 4) return

            var data = [parseInt(args[0]), parseInt(args[1]), -1, -1];

            switch (args[2]) {
                case "h":
                    data[2] = 1;
                    break;
                case "s":
                    data[2] = 2;
                    break;
            }

            switch (args[3]) {
                case "l":
                    data[3] = 1;
                    break;
                case "d":
                    data[3] = 2;
                    break;
                case "w":
                    data[3] = 3;
                    break;
            }
            
            fs.appendFile('bjdata.txt', `\n${data.join(";")}`, async function (err) {
                if (err) throw err;
                await message.react("✅");
            });
        })();
    }
}