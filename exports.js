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
        var flags = null;
        var flags1 = "";
        try {
            flags = user.flags.toArray().join(' ');
        } catch {
            flags1 = 'None';
        }
        if (!flags || flags === null) {
            flags1 = 'None';
        } else if (flags1 !== 'None') {
            if (flags.includes('HypeSquadOnlineHouse1')) flags1 += '<:Bravery:999455581280686181>';
            if (flags.includes('HypeSquadOnlineHouse2')) flags1 += '<:Brilliance:999455581960159314>';
            if (flags.includes('HypeSquadOnlineHouse3')) flags1 += '<:Balance:999455580487958649>';
            if (flags.includes('BugHunterLevel')) flags1 += '<:BugHunter:999455579707805746>';
            if (flags.includes('Staff')) flags1 += '<:Discord_Staff:999455578931867719> ';
            if (flags.includes('VerifiedDeveloper')) flags1 += '<:Early_Developer:999455578097189025>';
            if (flags.includes('PremiumEarlySupporter')) flags1 += '<:EarlySupporter:999455577451274290>';
            if (flags.includes('Hypesquad')) flags1 += '<:HypesquadEvents:999455576645976094>';
            if (flags.includes('Partner')) flags1 += '<:Partnered_Server_Owner:999455574808875170>';
        }
        if (user.displayAvatarURL({ dynamic: true }).endsWith('.gif') || user.discriminator < 5 || user.disciminator > 9990) {
            flags1 += '<:Nitro_Subscriber:849757959306608681>';
        }

        return flags1;
    },
    getStatus: function (status) {
        switch (status) {
            case 'online': status = '<:online:999477878796337233> Online'; break;
            case 'idle': status = '<:idle:999477877768728647> Idle'; break;
            case 'dnd': status = '<:dnd:999477876862758993> Do Not Disturb'; break;
            case 'offline': status = '<:offline:999477875428298752> Offline / Invisible'; break;
            case undefined: status = '<:offline:999477875428298752> Offline / Invisible'; break;
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
        for (let i = 1; i <= Math.floor(Math.sqrt(n)); i++) {
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
            latency = `${(latency / 1000).toFixed(5)}s`;
        } else {
            latency = `${latency.toFixed(5)}ms`;
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
    prng: function () {
        var now = performance.now().toString();
        var input = parseInt(now.substring(now.length - 3));

        if (input < 100) input = Math.pow(input + 100, 2);

        var output = input.toString(2);
        var output2 = (output + "000").slice(3);
        var output3 = output.split('');
        var output4 = output2.split('');
        var output5 = "";

        for (var i = 0; i < output3.length; i++) {
            if (output3[i] === output4[i]) {
                output5 += "0";
            } else {
                output5 += "1";
            }
        }

        var output6 = parseInt(parseInt(output5), 2).toString();
        return (parseInt(output6.substring(output6.toString().length - 1)) + 1).toString(); // literally just gets the last digit and add 1
    },
    foil: function (a, b, c, d) {
        return [a * c, a * d, b * c, c * d]
    },
    simplRoot: function (n) {
        if (Number.isInteger(Math.sqrt(n))) {
            return [Math.sqrt(n)];
        } else {
            var f = this.findFactors(n);
            f = f.sort(function (a, b) { return a - b });

            var perfsq = null;
            var sqrt;

            for (var i = f.length - 1; i >= 1; i--) {
                sqrt = Math.sqrt(f[i])
                if (Number.isInteger(sqrt)) {
                    perfsq = sqrt;
                    break;
                }
            }

            if (perfsq !== null) {
                return [perfsq, n / Math.pow(perfsq, 2)]
            } else {
                return [n];
            }
        }
    },
    gcf: function (n1, n2, n3) {
        var f1 = bot.findFactors(n1);
        var f2 = bot.findFactors(n2);
        var f3 = bot.findFactors(n3);
        var gcf = null;
            
        for (var i = f1.length - 1; i >= 1; i--) {
            if (f2.includes(f1[i]) && f3.includes(f1[i])) {
                gcf = f1[i];
                break;
            }
        }

        return gcf;
    },
    in: function (s) {
        return parseInt(s);
    }
}
module.exports = {
    bot: bot
};