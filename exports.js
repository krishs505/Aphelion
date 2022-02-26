const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS] });

const devTesters = ['252980043511234560'];
const staff = ['252980043511234560', '258265415770177536', '572927730707071006'];

var bot = {
    isKihei: function (id) {
        if (id == '252980043511234560') {
            return true;
        } else return false
    },
    isLab: function (thing) {
        var IL = false;
        if (thing.guild.id === '931971550528290886' && thing.channel.id === '931971550528290889') IL = true;
        return IL;
    },
    isDevTester: function (id) {
        if (devTesters.indexOf(id) !== -1) {
            return true;
        } else return false
    },
    isStaff: function (id) {
        if (staff.indexOf(id) !== -1) {
            return true;
        } else return false
    },
    randomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    makeId: function (length) {
        var result = [];
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result.push(characters.charAt(Math.floor(Math.random() *
                charactersLength)));
        }
        return result.join('');
    },
    plural: function (num) {
        if (parseInt(num) == 1) {
            return '';
        } else {
            return 's';
        }
    },
    getBadges: function (user) {
        var flags;
        var flags1 = '';
        try {
            flags = user.flags.toArray().join(', ');
        } catch {
            flags1 = 'None';
        }
        if (!flags) flags1 = 'None';

        if (flags1 !== 'None') {
            if (flags.includes('HOUSE_BRAVERY')) flags1 = flags1 + '<:Bravery:849751729674125312> ';
            if (flags.includes('HOUSE_BRILLIANCE')) flags1 = flags1 + '<:Brilliance:849751729754341427> ';
            if (flags.includes('HOUSE_BALANCE')) flags1 = flags1 + '<:Balance:849751729536761918> ';
            if (flags.includes('HYPESQUAD_EVENTS')) flags1 = flags1 + '<:Hypesquad_Events:849753779116441611> ';
            if (flags.includes('BUGHUNTER')) flags1 = flags1 + '<:BugHunter:849752606493507604> ';
            if (flags.includes('EARLY_VERIFIED_DEVELOPER') || flags.includes('VERIFIED_DEVELOPER')) flags1 = flags1 + '<:Early_Developer:849761396912291892> ';
            if (flags.includes('EARLY_SUPPORTER')) flags1 = flags1 + '<:Early_Supporter:849754395579121694> ';
        }
        if (user.displayAvatarURL({ dynamic: true }).endsWith('.gif') || user.discriminator < 5 || user.disciminator > 9990) flags1 = flags1 + '<:Nitro_Subscriber:849757959306608681>';

        return flags1;
    },
    getStatus: function (status) {
        switch (status) {
            case 'online': status = '<:online:912099878275022860>'; break;
            case 'offline': status = '<:offline:912099878111424583>'; break;
            case 'idle': status = '<:idle:912099878174359582>'; break;
            case 'dnd': status = '<:dnd:912099878140801074>'; break;
        }
        return status;
    },
    getPFP: function (user) {
        var avurl1 = user.displayAvatarURL({ dynamic: true }).split('.');
        var fot = avurl1.pop();
        var avurl = avurl1.join('.').trim();
        return `${avurl}.${fot}`;
    },
    findFactors: function (n) {
        var int = parseInt(n);
        var f = [];
        for (let i = 1; i <= Math.floor(Math.sqrt(n)) + 1; i++) {
            if (int % i === 0) {
                f.push(i);
                f.push(int / i);
            }
        }
        return f;
    },
    estimateFactorsTime: function (n) {
        return (Math.floor(Math.sqrt(n)) + 1) / 103391164 * 1000;
    },
    organizeFactors: function (arr) {
        var Um = Math.floor(arr.length / 2); // upper median OR center if odd set
        var Lm; // lower median OR center if odd set
        var f = [[], []];

        if (arr.length % 2) { // testing for odd set ( remainder = true, 0 = false )
            Lm = Um;
        } else {
            Lm = Um - 1;
        }

        for (var i = 0; i <= Lm; i++) {
            f[0].push(arr[i]);
        }
        for (var i = arr.length - 1; i >= Um; i--) {
            f[1].push(arr[i]);
        }

        return f;
    },
    simplifyFraction: function (num, den) {
        var factors = [];
        var cf = [];

        for (let i = 1; i <= num; i++) {
            if (num % i === 0) {
                factors.push(i);
            }
        }

        for (let i = 1; i <= den; i++) {
            if (den % i === 0 && factors.indexOf(i) !== -1) {
                cf.push(i);
            }
        }

        var gcf = cf[cf.length - 1];
        var newNum = num / gcf;
        var newDen = den / gcf;
        var result = `**${newNum}/${newDen}**`;
        if (newNum / newDen > 1) {
            result = `**${newNum}/${newDen}** or **${Math.round(newNum / newDen)} ${newNum % newDen}/${newDen}**`;
        }

        return result;
    },
    findLatency: function (s, e) {
        let latency = e - s;
        if (latency > 1000) {
            latency = `${latency / 1000}s`;
        } else {
            latency = `${latency}ms`;
        }

        return `Calculated in **${latency}**`;
    },
    shuffleArray: function (arr) {
        const length = arr.length; // set to maintain loop iteration value
        var shuffled = [];

        for (var i = 0; i < length; i++) {
            var random = this.randomInt(0, arr.length - 1); // generate a random index of the array
            shuffled.push(arr[random]); // push that random item to the shuffled array
            arr.splice(random, 1); // delete that item from the array (so it only generates new ones in the next iteration)
        }

        return shuffled;
    },
    removeCommas: function (str) {
        return str.replaceAll(',', '');
    },
}
module.exports = {
    bot: bot
};

const { devMode } = require('./config.json');

var token;
if (devMode) {
    const { dtoken } = require('./dev-config.json');
    token = dtoken;
} else {
    token = process.env.TOKEN;
}

client.login(token);