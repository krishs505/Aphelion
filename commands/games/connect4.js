const { bot } = require("../../index")
let data_store = require('data-store');
let settings = new data_store({ path: process.cwd() + '/connect4.json' });

function or(sub, arr) {
    var bool = false;
    for (var i = 0; i < arr.length; i++) {
        if (sub === arr[i]) bool = true;
    }
    return bool;
}

function generateBoard(cls) {
    var board = [];

    var lol = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ];
    var rows = [
        [cls[0][0],cls[1][0],cls[2][0],cls[3][0],cls[4][0],cls[5][0],cls[6][0]],
        [cls[0][1],cls[1][1],cls[2][1],cls[3][1],cls[4][1],cls[5][1],cls[6][1]],
        [cls[0][2],cls[1][2],cls[2][2],cls[3][2],cls[4][2],cls[5][2],cls[6][2]],
        [cls[0][3],cls[1][3],cls[2][3],cls[3][3],cls[4][3],cls[5][3],cls[6][3]],
        [cls[0][4],cls[1][4],cls[2][4],cls[3][4],cls[4][4],cls[5][4],cls[6][4]],
        [cls[0][5],cls[1][5],cls[2][5],cls[3][5],cls[4][5],cls[5][5],cls[6][5]]
    ];

    rows.forEach(r => {
        r.forEach(p => {
            if (p === 0) board.push("<:empty:927727249434755172> ");
            if (p === 1) board.push("<:red:927719260162228315> ");
            if (p === 2) board.push("<:yellow:927719260577497098> ");
        })
        board.push('\n');
    })

    board.pop();

    return board.join("");
}

module.exports = {
    name: 'connect4',
    description: 'Play a Connect4 game with someone!',
    aliases: ['c4'],
    usage: '[user mention/ID]',
    cooldown: 0,
    od: true,
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

            if (!args[0]) {
                if (!settings.hasOwn(`${g}.${c}.state`)) {

                    settings.set(`${g}.${c}.p1`, message.author.id);
                    settings.set(`${g}.${c}.state`, 'waiting');
                    message.channel.send(`**Connect4** - <a:loading_forever:822539925786329149> Waiting for players...\nUse \`+connect4 join\` to join **${message.author.username}**'s game!`)
                
                } else if (settings.get(`${g}.${c}.state`) === 'game') {
                    return message.channel.send("Sorry, these is already an active game in this channel! Wait for it to finish or go to another available channel.");
                } else {
                    return message.channel.send("Use `++connect4 join` to join the game!");
                }
            } else if (args[0].toLowerCase() === 'join') {

                if (settings.get(`${g}.${c}.state`) === 'game') return message.channel.send("Please wait for the current game in this channel to finish!");
                if (message.author.id === settings.get(`${g}.${c}.p1`)) return message.channel.send("You can't join your own game!")

                settings.set(`${g}.${c}.p2`, message.author.id);
                settings.set(`${g}.${c}.state`, 'game');

                ba = [
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                ];

                settings.set(`${g}.${c}.ba`, ba);
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
                    case settings.get(`${g}.${c}.p1`): sign = '<:red:927719260162228315>'; break;
                    case settings.get(`${g}.${c}.p2`): sign = '<:yellow:927719260577497098>'; break;
                }
                settings.set(`${g}.${c}.sign`, sign);

                sent = await message.channel.send(`__**Connect4** - ${p1m} vs ${p2m}__\n\n**Current Turn:** ${settings.get(`${g}.${c}.sign`)} <@${settings.get(`${g}.${c}.turn`)}>`)
                game = await message.channel.send(generateBoard(ba));

                settings.set(`${g}.${c}.sentmsg`, sent);
                settings.set(`${g}.${c}.gamemsg`, game);

            } else if (or(parseInt(args[0]), [1, 2, 3, 4, 5, 6, 7])) {

                message.channel.send('yup!');

            } else {
                message.channel.send('Incorrect usage! Use `+help connect4`.');
            }
        })();
    }
}