const { bot } = require("../../index")
let data_store = require('data-store');
let settings = new data_store({ path: process.cwd() + '/ttt.json' });
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

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
function row(f, s, t, id1, id2, id3, d1, d2, d3) {
    return new MessageActionRow().addComponents(new MessageButton().setCustomId(id1).setStyle('PRIMARY').setEmoji(f).setDisabled(d1),new MessageButton().setCustomId(id2).setStyle('PRIMARY').setEmoji(s).setDisabled(d2),new MessageButton().setCustomId(id3).setStyle('PRIMARY').setEmoji(t).setDisabled(d3));
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

    if ((isXS(a[0]) && isXS(a[1]) && isXS(a[2]))
    || (isXS(a[3]) && isXS(a[4]) && isXS(a[5]))
    || (isXS(a[6]) && isXS(a[7]) && isXS(a[8]))
    || (isXS(a[0]) && isXS(a[3]) && isXS(a[6]))
    || (isXS(a[1]) && isXS(a[4]) && isXS(a[7]))
    || (isXS(a[2]) && isXS(a[5]) && isXS(a[8]))
    || (isXS(a[0]) && isXS(a[3]) && isXS(a[8]))
    || (isXS(a[2]) && isXS(a[4]) && isXS(a[6]))
    ) {
        return true;
    } else {
        return false;
    }
}
function OWins(a) {
    if ((isOS(a[0]) && isOS(a[1]) && isOS(a[2]))
    || (isOS(a[3]) && isOS(a[4]) && isOS(a[5]))
    || (isOS(a[6]) && isOS(a[7]) && isOS(a[8]))
    || (isOS(a[0]) && isOS(a[3]) && isOS(a[6]))
    || (isOS(a[1]) && isOS(a[4]) && isOS(a[7]))
    || (isOS(a[2]) && isOS(a[5]) && isOS(a[8]))
    || (isOS(a[0]) && isOS(a[3]) && isOS(a[8]))
    || (isOS(a[2]) && isOS(a[4]) && isOS(a[6]))
    ) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    name: 'qwer',
    description: 'Play a Tic Tac Toe game with someone!',
    aliases: ['qwer'],
    usage: '[user mention/ID]',
    cooldown: 0,
    od: true,
    execute(message, args) {
        (async () => {
            var g = message.guild.id;
            var c = message.channel.id;

            if (!settings.has(`${g}.${c}.state`)) {

                if (!args[0]) return message.channel.send('Please provide a member to play with!');
                let mentionedID = args[0].trim().replace('<', '').replace('@', '').replace('!', '').replace('>', '');
                let mentioned = message.guild.members.cache.get(mentionedID);
                if (!mentioned) return message.channel.send('That member does not exist!');
                if (mentioned.bot) return message.channel.send('You cannot play with a bot!');

                settings.set(`${g}.${c}.p1`, message.author.id);
                settings.set(`${g}.${c}.p2`, mentionedID);
                settings.set(`${g}.${c}.state`, 'game');
                message.channel.send(`<@${mentionedID}>, **${message.author.username}** sent you a request to play TicTacToe! Enter \`+tictactoe yes\` to accept!`)

            } else if (settings.get(`${g}.${c}.state`) === 'game') {
                if (message.author.id === settings.get(`${g}.${c}.p2`) && args[0] === 'yes') {
                    if (args[0] !== 'yes') return

                    settings.set(`${g}.${c}.ba`, ['🔳','🔳','🔳','🔳','🔳','🔳','🔳','🔳','🔳']);
                    settings.set(`${g}.${c}.baD`, [false, false, false, false, false, false, false, false]);
                    var ba = settings.get(`${g}.${c}.ba`);
                    var baD = settings.get(`${g}.${c}.baD`);
                    var sent;
                    var row1 = row(ba[0], ba[1], ba[2], '0', '1', '2');
                    var row2 = row(ba[3], ba[4], ba[5], '3', '4', '5');
                    var row3 = row(ba[6], ba[7], ba[8], '6', '7', '8');

                    var p1id = settings.get(`${g}.${c}.p1`);
                    var p2id = settings.get(`${g}.${c}.p2`);
                    var p1m = `<@${p1id}>`;
                    var p2m = `<@${p2id}>`;
                    var winner = '';

                    const collector = message.channel.createMessageComponentCollector();

                    var rand = Math.floor(Math.random() * 2);
                    var ef;
                    switch (rand) {
                        case 0: ef = p1id; break;
                        case 1: ef = p2id; break;
                    }
                    settings.set(`${g}.${c}.turn`, ef);

                    sent = await message.channel.send(`The TicTacToe game between ${p1m} and ${p2m} has begun!\n**Current Turn:** <@${settings.get(`${g}.${c}.turn`)}>`);
                    await message.channel.send({ content: '_ _', components: [row1] });
                    await message.channel.send({ content: '_ _', components: [row2] });
                    await message.channel.send({ content: '_ _', components: [row3] });

                    collector.on('collect', async i => {
                        if (i.user.id === settings.get(`${g}.${c}.turn`)) {
                            var sign;
                            var id = parseInt(i.customId);
                            switch (i.user.id) {
                                case settings.get(`${g}.${c}.p1`): sign = '❌'; break;
                                case settings.get(`${g}.${c}.p2`): sign = '⭕'; break;
                            }
                            ba = settings.get(`${g}.${c}.ba`);
                            baD = settings.get(`${g}.${c}.baD`);
                            ba[id] = sign;
                            baD[id] = true;
                            settings.set(`${g}.${c}.ba`, ba);
                            settings.set(`${g}.${c}.baD`, baD);
    
                            if (id === 0 || id === 1 || id === 2) {
                                row1 = row(ba[0], ba[1], ba[2], '0', '1', '2', baD[0], baD[1], baD[2]);
                                await i.update({ content: '_ _', components: [row1] });
                            } else if (id === 3 || id === 4 || id === 5) {
                                row2 = row(ba[3], ba[4], ba[5], '3', '4', '5', baD[3], baD[4], baD[5]);
                                await i.update({ content: '_ _', components: [row2] });
                            } else if (id === 6 || id === 7 || id === 8) {
                                row3 = row(ba[6], ba[7], ba[8], '6', '7', '8', baD[6], baD[7], baD[8]);
                                await i.update({ content: '_ _', components: [row3] });
                            }
    
                            var np;
                            switch (settings.get(`${g}.${c}.turn`)) {
                                case p1id: np = p2id; break;
                                case p2id: np = p1id; break;
                            }
                            settings.set(`${g}.${c}.turn`, np);
                            sent.edit(`The TicTacToe game between ${p1m} and ${p2m} has begun!\n**Current Turn:** <@${np}>`).catch(a => {});

                            if (XWins(ba)) {
                                winner = p1id;
                            } else if (OWins(ba)) {
                                winner = p2id;
                            } else if (ba[0] !== '🔳' && ba[1] !== '🔳' && ba[2] !== '🔳' && ba[3] !== '🔳' && ba[4] !== '🔳' && ba[5] !== '🔳' && ba[6] !== '🔳' && ba[7] !== '🔳' && ba[8] !== '🔳') {
                                winner = 'draw';
                            }

                            if (winner !== '') {
                                var moosage = `**GG, <@${winner}> won the TicTacToe game!**`;
                                if (winner === 'draw') moosage = `**GG, the TicTacToe game was a draw!**`;
                                message.channel.send(moosage);
                                sent.edit(`The TicTacToe game between ${p1m} and ${p2m} has begun!`).catch(a => {});
                                winner = undefined;
                                settings.del(`${g}.${c}`);
                            }
                        }
                    });
                } else return message.channel.send('Sorry, there is already a TicTacToe game in progress in this channel!')
            }
        })();
    }
}