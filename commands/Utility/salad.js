const { Client, Intents, MessageActionRow, MessageSelectMenu, NewsChannel } = require('discord.js');
const { bot } = require('../..');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const sSchema = require('../../schemas/salad-session');
const dSchema = require('../../schemas/salad-data');

/*const sData = sSchema.findById("619aa71c205febd1b301f48d");
const dID = "619ab24439dcc364047a01a9";
const data = dSchema.findById(dID);*/

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

function cdb(m, bAmt, bT, bM) { // check data beginning
    var errors = [];
    if (sData.m !== m) {
        errors.push('- Mining boolean set incorrectly.');
    } else if (sData.bAmt !== bAmt) {
        errors.push('- Amount set incorrectly.');
    } else if (sData.bT !== bT) {
        errors.push('- Time set incorrectly.');
    } else if (sData.bM !== bM) {
        errors.push('- Month set incorrectly.');
    }

    if (!errors.length) {
        return ":thumbsup: All data is valid!";
    } else {
        return `:x: ${errors.length-1} error${bot.plural(errors.length-1)} spotted!\n${errors.join('\n')}\n**Please check the database and/or console!**`;
    }
}

function cde(m, mph, inc, hrs, dts) { // check data ending
    var errors = [];
    if (
        data.mph.length !== data.inc.length
        || data.mph.length !== data.hrs.length
        || data.mph.length !== data.dts.length
    ) {
        errors.push('Mismatched data amounts!');
    } else if (sData.m !== m) {
        errors.push('- Mining boolean set incorrectly.');
    } else if (sData.mph !== mph) {
        errors.push('- MPH data set incorrectly.');
    } else if (sData.inc !== inc) {
        errors.push('- Income data set incorrectly.');
    } else if (sData.hrs !== hrs) {
        errors.push('- Hours data set incorrectly.');
    } else if (sData.dts !== dts) {
        errors.push('- Dates data set incorrectly.');
    }

    if (!errors.length) {
        return ":thumbsup: All data is set correctly!";
    } else {
        return `:x: ${errors.length-1} error${bot.plural(errors.length-1)} spotted!\n${errors.join('\n')}\n**Please check the database and/or console!**`;
    }
}

module.exports = {
    name: 'salad',
    description: 'Add Salad earning data to the database.',
    usage: '[start/stop/stats]',
    cooldown: 0,
    execute(message, args) {
        (async () => {
            if (!bot.isChick3n(message.author.id)) return

            const sData = sSchema.findById("619aa71c205febd1b301f48d");
            const dID = "619ab24439dcc364047a01a9";
            const data = dSchema.findById(dID);

            if (args[0] === 'stats') {
                
            } else if (args[0] === 'dls') {
                data.mph.pop();
                data.inc.pop();
                data.hrs.pop();
                data.dts.pop();
                await dSchema.findByIdAndUpdate(dID, { $set: { mph: data.mph }, });
                await dSchema.findByIdAndUpdate(dID, { $set: { inc: data.inc }, }); 
                await dSchema.findByIdAndUpdate(dID, { $set: { hrs: data.hrs }, });
                await dSchema.findByIdAndUpdate(dID, { $set: { dts: data.dts }, });

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

                    // var moosage = await message.channel.send('<a:loading_forever:822539925786329149> Checking data..');
                    // await moosage.edit(cde(false, parseFloat((inc / diff).toFixed(2)), parseFloat(inc.toFixed(2)), parseFloat(diff.toFixed(2)), `${sData.bM} ${t[0]}`));

                    await message.channel.send(`You have ended the mining session with **$${args[0]}**!\nHere are the stats:\n\n**Income:** $${inc.toFixed(2)}\n**Time Mined:** ${diff.toFixed(2)} hours\n\n**Money/hr:** ${(inc / diff).toFixed(2)}`);
                }
            }
        })();
    },
};