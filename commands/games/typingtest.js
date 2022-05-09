const { bot } = require("../../exports");
let fs = require('fs');

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS] });

const ttSchema = require('../../schemas/typing-tests-schema');
const dID = "621e9e2647e2f613fba1deaa";

module.exports = {
    name: 'typingtest',
    description: 'Test your typing speed!',
    aliases: ['tt'],
    usage: ' ',
    cooldown: 0,
    od: true,
    execute(message) {
        (async () => {
            
            let ttData = await ttSchema.findById(dID);

            if (ttData.state === "n") {
                fs.readFile('commands/games/games_data/ttwords.txt', 'utf8' , async (err, text) => {
                    if (err) { console.error(err); return; }

                    var words = text.split("\r\n");

                    var phrase = [];
                    var pLength = 5;
                
                    for (var i = 0; i < pLength; i++) {
                        phrase.push(words[bot.randomInt(0, words.length - 1)]);
                    }

                    await message.channel.send(phrase.join(" "));
                    var now = Date.now();

                    await ttSchema.updateOne({ startingTime: ttData.startingTime }, { startingTime: now });
                    await ttSchema.updateOne({ phrase: ttData.phrase }, { phrase: phrase });
                    await ttSchema.updateOne({ user: ttData.user }, { user: message.author.id });
                    await ttSchema.updateOne({ channel: ttData.channel }, { channel: message.channel.id });
                    await ttSchema.updateOne({ state: ttData.state }, { state: "running" });
                    
                    setTimeout(async () => {
                        ttData = await ttSchema.findById(dID);
                        if (ttData.state === "n") return
                        await ttSchema.updateOne({ state: ttData.state }, { state: "n" });
                        await message.channel.send(":x: Typing test cancelled due to inactivity.");
                    }, pLength * 1000);
                });
            } else {
                message.channel.send("There is already a running typing test!");
            }

        })();
    }
}

/*client.on('messageCreate', async message => {
    var now = Date.now();
    const ttData = await ttSchema.findById(dID);

    if (ttData.state === "n" || ttData.user !== message.author.id || ttData.channel !== message.channel.id) return

    var msg = message.content.split(" ");
    var time = (now - ttData.startingTime) / 1000 / 60;

    await message.channel.send(`WPM: ${Math.round(message.content.length / 5 / time)}`);
    await ttSchema.updateOne({ state: ttData.state }, { state: "n" });
});


var token;
const { devMode } = require('../../config.json');
if (devMode) {
    const { dtoken } = require('../../dev-config.json');
    token = dtoken;
} else {
    token = process.env.TOKEN;
}

client.login(token);*/