const { bot } = require("../../exports")

module.exports = {
    name: 'fibonacci',
    description: 'Run the Fibonacci Series.',
    aliases: ['fibo'],
    usage: '',
    cooldown: 0,
    execute(message, args) {
        (async () => {
            var s = [1, 1];
            
            console.log('Fibonacci Series:');
            console.log(s[0]);
            console.log(s[1]);
            
            for (var i = 0; i <= 50; i++) {
                s.push(s[s.length - 2] + s[s.length - 1]);
                console.log(s[s.length - 1]);
            }
        })();
    }
}