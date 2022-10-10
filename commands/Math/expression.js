const { bot } = require("../../exports")
const oper = ["+", "-", "*", "/", "^"];

function isO(str) {
    if (oper.indexOf(str) !== -1) {
        return true;
    } else {
        return false;
    }
}

function containsO(s) {
    var c = false;
    for (var i = 0; i < s.length; i++) {
        if (isO(s[i])) {
            c = true;
            break;
        }
    }
    if (c) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    name: 'expression',
    description: 'Solve an expression.',
    aliases: ['exp'],
    usage: '<expression>',
    cooldown: 0,
    od: true,
    execute(message, args) {
        (async () => {
            if (!args[0]) return message.channel.send('Please include an expression!');
            
            var e = args.join("");
            console.log(e);

            var err = false;

            if (e.includes('=') || isO(e[0]) || isO(e[e.length - 1])) err = true;

            for (var i = 1; i < e.length; i++) {
                if (isO(e[i]) && isO(e[i - 1])) {
                    err = true;
                }
            }

            if (err) return message.channel.send('Invalid expression!')
            
            var alph = 'qwertyuiopasdfghjklzxcvbnm';
            var v = [];
            for (var i = 0; i < e.length; i++) {
                if (alph.indexOf(e[i]) !== -1) {
                    v.push(e[i]);
                }
            }

            // console.log(v)

            if (v.length === 0) {
                var terms = [];
                var j = 1;
                // push all terms into an array
                while (containsO(e)) {
                    if (isO(e[j])) {
                        terms.push(e.substr(0, j)); terms.push(e[j]);
                        e = e.slice(e.substr(0, j+1).length);
                        j = -1;
                    }
                    j++;
                }
                terms.push(e); // the last number remaining in the expression

                console.log(terms);

                // simplify using PEMDAS rules
                while (terms.includes("*") || (terms.includes("/"))) {
                    for (var i = 0; i < terms.length; i++) {
                        if (terms[i] === "*") {
                            terms[i] = terms[i - 1] * terms[i + 1];
                            terms.splice(i - 1, 1); terms.splice(i, 1);
                        }
                        if (terms[i] === "/") {
                            terms[i] = terms[i - 1] / terms[i + 1];
                            terms.splice(i - 1, 1); terms.splice(i, 1);
                        }
                    }

                    console.log(terms)
                }
                while (terms.includes("+") || (terms.includes("-"))) {
                    for (var i = 0; i < terms.length; i++) {
                        if (terms[i] === "+") {
                            terms[i] = bot.in(terms[i - 1]) + bot.in(terms[i + 1]);
                            terms.splice(i - 1, 1); terms.splice(i, 1);
                        }
                        if (terms[i] === "-") {
                            terms[i] = bot.in(terms[i - 1]) - bot.in(terms[i + 1]);
                            terms.splice(i - 1, 1); terms.splice(i, 1);
                        }
                    }
                    
                    console.log(terms)
                }
                
                await message.channel.send(terms[0].toString());

            } else {

            }
        })();
    }
}