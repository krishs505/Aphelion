const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS] });

/** Settings **/
let prefix = '+';
let BotName = 'Aphelion';
const DJSVersion = '13.6';
const BotSupportLink = 'https://discord.gg/';
const BotDev = '252980043511234560';

/* Token Handler (devMode) */
const { devMode, connectToMongo } = require('./config.json');
var token;
var MONGO_URI;
if (devMode) {
    const { dtoken, dMONGO_URI } = require('./dev-config.json');
    token = dtoken;
    MONGO_URI = dMONGO_URI;
    prefix += prefix;
    BotName += " Dev";
} else {
    token = process.env.TOKEN;
    MONGO_URI = process.env.MONGO_URI;
}

const { bot } = require('./exports');

// require('./invisdetection');

const fs = require('fs');
const mongoose = require('mongoose');
const data_store = require('data-store');
// const wait = require('util').promisify(setTimeout);

let settings = new data_store({ path: process.cwd() + '/settings.json' });

client.on('ready', async () => {
    if (connectToMongo) {
        await mongoose.connect(
            MONGO_URI,
            {
                keepAlive: true
            }
        ).then(async (mongoose) => {
            try {
                console.log('Connected to MongoDB!');
            } catch (error) {
                console.log(error);
            }
        })
    }

    console.log(`${BotName} is online! ${client.ws.ping}ms`);
    client.user.setPresence({ activities: [{ type: 'WATCHING', name: "Kihei's brain fry!" }], status: 'online' });
});

module.exports = {
    ws: client.ws,
    prefix: prefix,
    BotName: BotName,
    BotDev: BotDev,
    BotSupportLink: BotSupportLink,
    DJSVersion: DJSVersion
}

// Event Handler
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Store commands in a Collection
client.commands = new Collection();
client.cooldowns = new Collection();
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

// Command Handler
client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return

    const {
        cooldowns
    } = client;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0) * 1000;

    if (timestamps.has(message.author.id) && !bot.isKihei(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
        }
    }

    timestamps.set(message.author.id, now);
    (() => timestamps.delete(message.author.id), cooldownAmount);

    if (!bot.isKihei(message.author.id)) {
        if (!command.odp) {
            if (command.od) return
        } else if (message.author.id !== '457643046268436482') return
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.log(error);
        message.channel.send('There was an error trying to execute that command!');
    }
});

client.login(token);
