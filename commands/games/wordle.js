const { bot } = require("../../index");
let fs = require('fs');

module.exports = {
    name: 'wordle',
    description: 'Algorithm for solving a wordle.',
    usage: '[included chars] [excluded chars] [placed letters ("-" for empty)]',
    cooldown: 0,
    od: true,
    execute(message, args) {
        (async () => {
            settings.set('lol', 'yo')

            var included = args[0].split("");
            var excluded = args[1].split("");
            var greens = args;
            greens.splice(0, 2);

            console.log(included)
            console.log(excluded)
            console.log(greens)

            fs.readFile('commands/games/games_data/wordle_dictionary.txt', 'utf8' , async (err, text) => {
                if (err) { console.error(err); return; }

                var words = text.split("\r\n");
                var results = [];

                var s = Date.now();

                words.forEach(word => {
                    if (results.indexOf(word) !== -1) return;

                    if (included[0] !== '-') {
                        var includeScore = 0;
                        for (var i = 0; i < included.length; i++) {
                            if (word.includes(included[i])) includeScore++;
                        }
                        if (includeScore === included.length) results.push(word);
                    }

                    /*for (var i = 0; i < 5; i++) {
                        if (greens[i] !== '-' && greens[i] === word[i]) results.push(word);
                    }*/
                })

                var toBeRemoved = [];

                console.log(results.length);

                if (excluded[0] !== '-') {
                    for (var k = 0; k < results.length; k++) {
                        // console.log(k);
                        for (var i = 0; i < excluded.length; i++) {
                            if (results[k].includes(excluded[i])) {
                                // console.log(results[k] + " INCLUDES " + excluded[i]);
                                if (toBeRemoved.indexOf(results[k]) === -1) toBeRemoved.push(results[k]);
                            } else {
                                // console.log(results[k] + " DOESN'T INCLUDE " + excluded[i]);
                            }
                        }
                    }
                }
                
                console.log(toBeRemoved.length);
                
                for (var k = 0; k < results.length; k++) {
                    // console.log(k.toString() + " " + results[k]);
                    for (var i = 0; i < 5; i++) {
                        if (greens[i] !== '-') {
                            if (greens[i] !== results[k][i]) {
                                // console.log(results[k][i] + " != " + greens[i]);
                                if (toBeRemoved.indexOf(results[k]) === -1) toBeRemoved.push(results[k]);
                            } else {
                                // console.log(results[k][i] + " = " + greens[i]);
                            }
                        }
                    }
                }

                console.log(toBeRemoved.length);

                for (var i = 0; i < toBeRemoved.length; i++) {
                    results.splice(results.indexOf(toBeRemoved[i]), 1);
                }

                var e = Date.now();

                console.log(results);
                console.log(bot.findLatency(s, e));
                await message.channel.send(`**Possible word(s):**\n- ${results.join("\n- ")}\n\n${bot.findLatency(s, e)}`);
                console.log("---");
            });
        })();
    }
}