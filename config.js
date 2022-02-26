/*********************************************/

const devMode = false;
const connectToMongo = true;

const DJSVersion = '13.6';

/*********************************************/

const BotDev = '252980043511234560';
let BotName = 'Aphelion';
const BotSupportLink = 'https://discord.gg/';

/*********************************************/

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS] });

var token = process.env.TOKEN;
var prefix = "+";
if (devMode) {
    token = "ODQ5Mjc2ODI4ODE5NzgzNjgx.YLY0rg.H4uez14B4pgh7oPOZZCfrf3NC8M";
    prefix = "++";
    BotName += ' Dev';
}

module.exports = {
    token: token,
    MONGO_URI: "mongodb://krish:6pWNCBaPQ22486gi@cluster0-shard-00-00.wrbyp.mongodb.net:27017,cluster0-shard-00-01.wrbyp.mongodb.net:27017,cluster0-shard-00-02.wrbyp.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-bzjff8-shard-0&authSource=admin&retryWrites=true&w=majority",
    prefix: prefix,
    devMode: devMode,
    connectToMongo: connectToMongo,
    DJSVersion: DJSVersion,
    BotDev: BotDev,
    BotName: BotName,
    BotSupportLink: BotSupportLink
}

client.login(token);