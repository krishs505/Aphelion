const { Client, Intents, MessageActionRow, MessageSelectMenu, NewsChannel } = require('discord.js');
const { bot } = require('../..');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const sSchema = require('../../schemas/salad-session');
const dSchema = require('../../schemas/salad-data');

let data_store = require('data-store');
let database = new data_store({ path: process.cwd() + '/salad_data.json' });

function timeDiff(b, e) {
    if (b[0] === e[0]) { // same day
        if (e[2] >= b[2]) { // greater minutes
            return e[1] - b[1] + (e[2] - b[2]) / 60;
        } else {
            return e[1] - b[1] + (60 - b[2] + e[2]) / 60;
        }
    } else { // different days
        if (e[1] >= b[1]) { // greater hours
            if (e[2] >= b[2]) { // greater minutes 
                return 24 + e[1] - b[1] + (e[2] - b[2]) / 60;
            } else {
                return 24 + e[1] - b[1] + (60 - b[2] + e[2]) / 60;
            }
        } else {
            if (e[2] >= b[2]) { // greater minutes 
                return 24 - b[1] + e[1] + (e[2] - b[2]) / 60;
            } else {
                return 24 - b[1] + e[1] + (60 - b[2] + e[2]) / 60;
            }
        }
    }
}

function adp(loc, value) { // array data push
    var arr = database.get(loc);
    arr.push(value);
    database.set(loc, arr);
}

module.exports = {
    name: 'salad',
    description: 'Add Salad earning data to the database.',
    usage: '[start/stop/stats]',
    cooldown: 0,
    execute(message, args) {
        (async () => {
            if (!bot.isChick3n(message.author.id)) return

            const sData = await sSchema.findById("619aa71c205febd1b301f48d");
            const dID = "619ab24439dcc364047a01a9";
            const data = await dSchema.findById(dID);

            if (args[0] === 'stats') {
                
            } else if (args[0] === 'dls') {
                var mph = data.mph;
                mph.pop();
                await dSchema.findByIdAndUpdate(dID, { $set: { mph: mph }, });
                /*await dSchema.findByIdAndUpdate(dID, { $pull: { inc: data.inc[data.inc.length-1] }, });
                await dSchema.findByIdAndUpdate(dID, { $pull: { hrs: data.hrs[data.hrs.length-1] }, });
                await dSchema.findByIdAndUpdate(dID, { $pull: { dts: data.dts[data.dts.length-1] }, });*/

                console.log(data.mph.length);
                console.log(data.mph[data.mph.length-1]);

                await message.channel.send('Successfully deleted the last mining session!');
            } else if (args[0] === 'cancel') {
                await sSchema.updateOne({ m: sData.m }, { m: false });
                await message.channel.send('Successfully cancelled the current mining session!');
            } else {
                var d = new Date();
                var dA = [d.getDate(), d.getHours(), d.getMinutes()];
                
                if (sData.m === false) {
                    if (!args[0]) return message.channel.send('You must include a starting amount!');

                    // console.log(sData.mining);
                    await sSchema.updateOne({ m: sData.m }, { m: true });
                    await sSchema.updateOne({ bAmt: sData.bAmt }, { bAmt: parseFloat(args[0]) });
                    await sSchema.updateOne({ bT: sData.bT }, { bT: dA });
                    await sSchema.updateOne({ bM: sData.bM }, { bM: d.getMonth() + 1 });

                    await message.channel.send(`You have begun mining with **$${args[0]}** at ${d.getHours()}:${d.getMinutes()} on ${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}!`);
                } else {
                    if (!args[0]) return message.channel.send('You must include an ending amount!');

                    await sSchema.updateOne({ m: sData.m }, { m: false });

                    var diff = timeDiff(sData.bT, dA);
                    var inc = parseFloat(args[0]) - sData.bAmt;
                    var t = sData.bT;

                    await dSchema.findByIdAndUpdate(dID, { $push: { mph: parseFloat((inc / diff).toFixed(2)) }, });
                    await dSchema.findByIdAndUpdate(dID, { $push: { inc: parseFloat(inc.toFixed(2)) }, });
                    await dSchema.findByIdAndUpdate(dID, { $push: { hrs: parseFloat(diff.toFixed(2)) }, });
                    await dSchema.findByIdAndUpdate(dID, { $push: { dts: `${sData.bM} ${t[0]}` }, });

                    await message.channel.send(`You have ended the mining session with **$${args[0]}**!\nHere are the stats:\n\n**Income:** $${inc.toFixed(2)}\n**Time Mined:** ${diff.toFixed(2)} hours\n\n**Money/hr:** ${(inc / diff).toFixed(2)}`);
                }
            }
        })();
    },
};