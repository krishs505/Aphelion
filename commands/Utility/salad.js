const { Client, Intents, MessageActionRow, MessageSelectMenu, NewsChannel } = require('discord.js');
const { bot } = require('../..');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const Discord = require('discord.js')

const sSchema = require('../../schemas/salad-session-schema');
const dSchema = require('../../schemas/salad-data-schema');
const wait = require('util').promisify(setTimeout);

const sdID = "619aa71c205febd1b301f48d";
const dID = "619ab24439dcc364047a01a9";

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

async function cdb(m, bAmt, bT, bM) { // check data beginning
    let sData = await sSchema.findById(sdID);
    let data = await dSchema.findById(dID);
    var errors = [];

    if (sData.m !== m) errors.push('- Mining boolean set incorrectly.');
    if (sData.bAmt !== bAmt) errors.push('- Amount set incorrectly.');
    for (var i = 0; i < 3; i++) {
        if (sData.bT[i] !== bT[i]) errors.push('- Time set incorrectly.');
    }
    if (sData.bM !== bM) errors.push('- Month set incorrectly.');

    if (!errors.length) {
        return ":thumbsup: All data is valid!";
    } else {
        return `:x: ${errors.length} error${bot.plural(errors.length)} spotted!\n${errors.join('\n')}\n**Please check the database and/or console!**`;
    }
}

async function cde(m, mph, inc, hrs, dts) { // check data ending
    let sData = await sSchema.findById(sdID);
    let data = await dSchema.findById(dID);
    var errors = [];

    if (data.mph.length !== data.inc.length || data.mph.length !== data.hrs.length || data.mph.length !== data.dts.length) errors.push('Mismatched data amounts!');
    if (sData.m !== m) errors.push('- Mining boolean set incorrectly.');
    if (data.mph[data.mph.length-1] !== mph) errors.push('- MPH data set incorrectly.');
    if (data.inc[data.inc.length-1] !== inc) errors.push('- Income data set incorrectly.');
    if (data.hrs[data.hrs.length-1] !== hrs) errors.push('- Hours data set incorrectly.');
    if (data.dts[data.dts.length-1] !== dts) errors.push('- Dates data set incorrectly.');

    if (!errors.length) {
        return ":thumbsup: All data is set correctly!";
    } else {
        return `:x: ${errors.length} error${bot.plural(errors.length)} spotted!\n${errors.join('\n')}\n**Please check the database and/or console!**`;
    }
}

async function cdd(mph, inc, hrs, dts) { // check data deleting
    let sData = await sSchema.findById(sdID);
    let data = await dSchema.findById(dID);
    var errors = [];

    if (data.mph.length !== data.inc.length || data.mph.length !== data.hrs.length || data.mph.length !== data.dts.length) errors.push('Mismatched data amounts!');
    if (data.mph.length !== mph) errors.push('- MPH data size is incorrect.');
    if (data.inc.length !== inc) errors.push('- Income data size is incorrect.');
    if (data.hrs.length !== hrs) errors.push('- Hours data size is incorrect.');
    if (data.dts.length !== dts) errors.push('- Dates data size is incorrect.');

    if (!errors.length) {
        return ":thumbsup: All data is set correctly!";
    } else {
        return `:x: ${errors.length} error${bot.plural(errors.length)} spotted!\n${errors.join('\n')}\n**Please check the database and/or console!**`;
    }
}

async function cdl() { // check data lengths
    let sData = await sSchema.findById(sdID);
    let data = await dSchema.findById(dID);

    if (data.mph.length !== data.inc.length || data.mph.length !== data.hrs.length || data.mph.length !== data.dts.length) {
        return 'Mismatched data amounts! **Please check the database!**';
    } else {
        return true;
    }
}

module.exports = {
    name: 'salad',
    description: 'Add Salad earning data to the database.',
    usage: '[start/stop/stats]',
    cooldown: 0,
    od: true,
    execute(message, args) {
        (async () => {
            const sData = await sSchema.findById(sdID);
            const data = await dSchema.findById(dID);

            if (args[0] === 'stats') {

                let moosage = await message.channel.send('<a:loading_forever:822539925786329149> Checking data..');
                let q = await cdl();
                if (q === true) {
                    await moosage.delete();
                } else {
                    await moosage.edit(q);
                }

                let d = new Date();
                
                let mph = data.mph;
                let inc = data.inc;
                let hrs = data.hrs;
                let dts = data.dts;
                var mphT = 0;
                let incT = 0;
                let hrsT = 0;
                let dtsD = [];

                for (var i = 0; i < mph.length - 1; i++) {
                    mphT += mph[i];
                    incT += inc[i];
                    hrsT += hrs[i];
                    
                    if (d.getDate) dtsD[i] = dts[i].split(' ');
                }

                const embed = new Discord.MessageEmbed()
                    .setAuthor({ name: `Salad Stats`, iconURL: 'https://avatars.githubusercontent.com/u/42049504?s=200&v=4' })
                    .setColor('#b029ff')
                    .addField('Average money/hour:', `$${(mphT/mph.length).toFixed(2)}`)
                    .addField('Average session length', `${(hrsT/hrs.length).toFixed(1)} hours`)
                    .setTimestamp(new Date().toISOString())
                
                console.log(dtsD);
                await message.channel.send({ embeds: [embed] });

            } else if (args[0] === 'dls') {
                
                if (!args[1]) {

                    if (sData.wfd === true) return message.channel.send('Please finish the current deletion confirmation!');

                    await sSchema.updateOne({ wfd: sData.wfd }, { wfd: true });
                    await message.channel.send("Are you sure you'd like to delete the last mining session? Run `+salad dls confirm` to confirm!");
                    
                    setTimeout(async () => {
                        let lol = await sSchema.findById(sdID);
                        if (lol.wfd === false) return
                        await sSchema.updateOne({ wfd: lol.wfd }, { wfd: false });
                        await message.channel.send('Confirmation time expired, you took too long!');
                    }, 15000);

                } else if (args[1] === 'confirm') {
                    if (data.wfd === false) return message.channel.send('There is no current confirmation necessary!');

                    await sSchema.updateOne({ wfd: sData.wfd }, { wfd: false });

                    let mD = data.mph; let iD = data.inc; let hD = data.hrs; let dD = data.dts;
                    mD.pop(); iD.pop(); hD.pop(); dD.pop();

                    var bl = [data.mph.length, data.inc.length, data.hrs.length, data.dts.length];

                    await dSchema.findByIdAndUpdate(dID, { $set: { mph: data.mph }, });
                    await dSchema.findByIdAndUpdate(dID, { $set: { inc: data.inc }, }); 
                    await dSchema.findByIdAndUpdate(dID, { $set: { hrs: data.hrs }, });
                    await dSchema.findByIdAndUpdate(dID, { $set: { dts: data.dts }, });

                    await message.channel.send('Successfully deleted the last mining session!');

                    let moosage = await message.channel.send('<a:loading_forever:822539925786329149> Checking data..');
                    let q = await cdd(bl[0], bl[1], bl[2], bl[3]);
                    await moosage.edit(q);

                }

            } else if (args[0] === 'cancel') {

                await sSchema.updateOne({ m: sData.m }, { m: false });
                await message.channel.send('Successfully cancelled the current mining session!');
                
            } else {
                let d = new Date();
                let dA = [d.getDate(), d.getHours(), d.getMinutes()];
                
                if (sData.m === false) {
                    if (!args[0]) return message.channel.send('You must include a starting amount!');

                    await sSchema.updateOne({ m: sData.m }, { m: true });
                    await sSchema.updateOne({ bAmt: sData.bAmt }, { bAmt: parseFloat(args[0]) });
                    await sSchema.updateOne({ bT: sData.bT }, { bT: dA });
                    await sSchema.updateOne({ bM: sData.bM }, { bM: d.getMonth() + 1 });

                    await message.channel.send(`You have begun mining with **$${args[0]}** at ${d.getHours()}:${d.getMinutes()} on ${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}!`);

                    var moosage = await message.channel.send('<a:loading_forever:822539925786329149> Checking data..');
                    var q = await cdb(true, parseFloat(args[0]), dA, d.getMonth() + 1);
                    await moosage.edit(q);

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

                    var moosage = await message.channel.send('<a:loading_forever:822539925786329149> Checking data..');
                    var q = await cde(false, parseFloat((inc / diff).toFixed(2)), parseFloat(inc.toFixed(2)), parseFloat(diff.toFixed(2)), `${sData.bM} ${t[0]}`);
                    await moosage.edit(q);
                }
            }
        })();
    },
};