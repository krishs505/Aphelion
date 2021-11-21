const {
    bot
} = require("../../index")
let data_store = require('data-store');
let settings = new data_store({ path: process.cwd() + '/ttt.json' });

function isX(msg) {
    if (msg === 'X' || msg === 'x') {
        return true;
    } else {
        return false;
    }
}

function isO(msg) {
    if (msg === '0' || msg === 'O' || msg === 'o') {
        return true;
    } else {
        return false;
    }
}
var otn = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

function isOTN(n) { // Is 1 - 9
    if (otn.indexOf(n) !== -1) {
        return true;
    } else {
        return false;
    }
}

function isFree(m, a) {
    /*var msg;
    switch (m) {
        case 1: msg = ':one:'; break;
        case 2: msg = ':two:'; break;
        case 3: msg = ':three:'; break;
        case 4: msg = ':four:'; break;
        case 5: msg = ':five:'; break;
        case 6: msg = ':six:'; break;
        case 7: msg = ':seven:'; break;
        case 8: msg = ':eight:'; break;
        case 9: msg = ':nine:'; break;
    }
    if (a.indexOf(msg) !== -1) {
        // return true;
    } else {
        // return false;
    }*/

    if (!isXS(a[m - 1]) && !isOS(a[m - 1])) {
        return true;
    } else {
        return false;
    }
}

function isO(msg) {
    if (msg === '0' || msg === 'O' || msg === 'o') {
        return true;
    } else {
        return false;
    }
}

function isXS(m) {
    if (m === '❌') {
        return true;
    } else {
        return false;
    }
}

function isOS(m) {
    if (m === '⭕') {
        return true;
    } else {
        return false;
    }
}

function XWins(a) {
    /*var XWinCases = [
        ['❌','❌','❌','🔳','🔳','🔳','🔳','🔳','🔳'],
        ['🔳','🔳','🔳','❌','❌','❌','🔳','🔳','🔳'],
        ['🔳','🔳','🔳','🔳','🔳','🔳','❌','❌','❌'],
        ['❌','🔳','🔳','❌','🔳','🔳','❌','🔳','🔳'], // 0 3 6
        ['🔳','❌','🔳','🔳','❌','🔳','🔳','❌','🔳'], // 1 4 7
        ['🔳','🔳','❌','🔳','🔳','❌','🔳','🔳','❌'], // 2 5 8
        ['❌','🔳','🔳','🔳','❌','🔳','🔳','🔳','❌'], // 0 3 8
        ['🔳','🔳','❌','🔳','❌','🔳','❌','🔳','🔳']  // 2 4 6
    ];*/

    if ((isXS(a[0]) && isXS(a[1]) && isXS(a[2])) ||
        (isXS(a[3]) && isXS(a[4]) && isXS(a[5])) ||
        (isXS(a[6]) && isXS(a[7]) && isXS(a[8])) ||
        (isXS(a[0]) && isXS(a[3]) && isXS(a[6])) ||
        (isXS(a[1]) && isXS(a[4]) && isXS(a[7])) ||
        (isXS(a[2]) && isXS(a[5]) && isXS(a[8])) ||
        (isXS(a[0]) && isXS(a[3]) && isXS(a[8])) ||
        (isXS(a[2]) && isXS(a[4]) && isXS(a[6]))
    ) {
        return true;
    } else {
        return false;
    }
}

function OWins(a) {
    if ((isOS(a[0]) && isOS(a[1]) && isOS(a[2])) ||
        (isOS(a[3]) && isOS(a[4]) && isOS(a[5])) ||
        (isOS(a[6]) && isOS(a[7]) && isOS(a[8])) ||
        (isOS(a[0]) && isOS(a[3]) && isOS(a[6])) ||
        (isOS(a[1]) && isOS(a[4]) && isOS(a[7])) ||
        (isOS(a[2]) && isOS(a[5]) && isOS(a[8])) ||
        (isOS(a[0]) && isOS(a[3]) && isOS(a[8])) ||
        (isOS(a[2]) && isOS(a[4]) && isOS(a[6]))
    ) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    name: 'tictactoe',
    description: 'Play a Tic Tac Toe game with someone!',
    aliases: ['ttt'],
    usage: '[user mention/ID]',
    cooldown: 0,
    execute(message, args) {
        (async () => {
            var g = message.guild.id;
            var c = message.channel.id;
            var ba;
            var p1id;
            var p2id;
            var p1m;
            var p2m;
            var winner = '';
            var sent;
            var game;

            if (!settings.hasOwn(`${g}.${c}.state`)) {

                settings.set(`${g}.${c}.p1`, message.author.id);
                settings.set(`${g}.${c}.state`, 'game');
                message.channel.send(`**TicTacToe Game!**\nUse \`+tictactoe join\` to join **${message.author.username}**'s game!`)

            } else if (args[0] === 'join') {

                if (message.author.id === settings.get(`${g}.${c}.p1`)) return message.channel.send("You can't join your own game!")

                settings.set(`${g}.${c}.p2`, message.author.id);
                settings.set(`${g}.${c}.ba`, [':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:']);
                ba = settings.get(`${g}.${c}.ba`);
                p1id = settings.get(`${g}.${c}.p1`);
                p2id = settings.get(`${g}.${c}.p2`);
                p1m = `<@${p1id}>`;
                p2m = `<@${p2id}>`;

                var rand = Math.floor(Math.random() * 2);
                var ef;
                switch (rand) {
                    case 0:
                        ef = p1id;
                        break;
                    case 1:
                        ef = p2id;
                        break;
                }
                settings.set(`${g}.${c}.turn`, ef);

                var sign;
                switch (settings.get(`${g}.${c}.turn`)) {
                    case settings.get(`${g}.${c}.p1`):
                        sign = '❌';
                        break;
                    case settings.get(`${g}.${c}.p2`):
                        sign = '⭕';
                        break;
                }
                settings.set(`${g}.${c}.sign`, sign);
                settings.set(`${g}.${c}.state`, 'game');
                
                sent = await message.channel.send(`The TicTacToe game between ${p1m} and ${p2m} has begun!\n\n**Current Turn:** ${settings.get(`${g}.${c}.sign`)} <@${settings.get(`${g}.${c}.turn`)}>`);
                game = await message.channel.send(`:one::two::three:\n:four::five::six:\n:seven::eight::nine:`);
                settings.set(`${g}.${c}.sentmsg`, sent);
                settings.set(`${g}.${c}.gamemsg`, game);

            } else if (message.author.id === settings.get(`${g}.${c}.turn`)) {

                if (!args[0] || !isOTN(args[0])) return message.channel.send('Please enter a valid position to place at!')
                if (!isFree(args[0], settings.get(`${g}.${c}.ba`))) return message.channel.send('That position is not free!')

                var ba = settings.get(`${g}.${c}.ba`);
                ba[args[0] - 1] = settings.get(`${g}.${c}.sign`);
                settings.set(`${g}.${c}.ba`, ba);
                ba = settings.get(`${g}.${c}.ba`);

                await settings.get(`${g}.${c}.gamemsg`).edit(`${ba[0]}${ba[1]}${ba[2]}\n${ba[3]}${ba[4]}${ba[5]}\n${ba[6]}${ba[7]}${ba[8]}`);

                if (XWins(ba)) {
                    winner = p1id;
                } else if (OWins(ba)) {
                    winner = p2id;
                } else if (ba[0] !== ':one:' && ba[1] !== ':two:' && ba[2] !== ':three:' && ba[3] !== ':four:' && ba[4] !== ':five:' && ba[5] !== ':six:' && ba[6] !== ':seven:' && ba[7] !== ':eight:' && ba[8] !== ':nine:') {
                    winner = 'draw';
                }

                if (winner !== '') {
                    var moosage = `**GG, <@${winner}> won the TicTacToe game!**`;
                    if (winner === 'draw') moosage = `**GG, the TicTacToe game was a draw!**`;
                    message.channel.send(moosage);
                    // sent.edit(`The TicTacToe game between ${p1m} and ${p2m} has begun!`);
                    // winner = undefined;
                    settings.del(`${g}.${c}`);
                    return;
                } else {
                    var np;
                    var ns;
                    switch (settings.get(`${g}.${c}.turn`)) {
                        case settings.get(`${g}.${c}.p1`):
                            np = settings.get(`${g}.${c}.p2`);
                            ns = '❌';
                            break;
                        case settings.get(`${g}.${c}.p2`):
                            np = settings.get(`${g}.${c}.p1`);
                            ns = '⭕';
                            break;
                    }
                    settings.set(`${g}.${c}.turn`, np);
                    settings.set(`${g}.${c}.sign`, ns);

                    await settings.get(`${g}.${c}.sentmsg`).edit(`The TicTacToe game between ${p1m} and ${p2m} has begun!\n\n**Current Turn:** ${settings.get(`${g}.${c}.sign`)} <@${settings.get(`${g}.${c}.turn`)}>`);
                }  
            } else return message.channel.send('Sorry, there is already a TicTacToe game in progress in this channel! Please wait for it to finish!')
        })();
    }
}