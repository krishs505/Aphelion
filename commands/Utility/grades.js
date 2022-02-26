const { bot } = require("../../exports");

module.exports = {
    name: 'grades',
    description: 'Calculate your grade.',
    aliases: ['grade'],
    usage: ' ',
    cooldown: 0,
    od: true,
    execute(message, args) {
        (async () => {
            /*
            Todo:
            - Create separate bot for this
            - Allow users to use it in DMs (or only DMs)
            - Open source code on GitHub (to ensure user privacy) and launch on Heroku
            */

            var split = args.indexOf("min");

            var maj = [];
            var min = [];
            for (var i = 0; i < args.length; i++) {
                maj.push(parseInt(args[i]));
                min.push(parseInt(args[i]));
            }
            maj = maj.splice(1, split - 1);
            min.splice(0, split + 1);

            var majS = 0;
            var minS = 0;

            for (var i = 0; i < maj.length; i++) {
                majS += maj[i];
            }
            for (var i = 0; i < min.length; i++) {
                minS += min[i];
            }

            var result = (0.6*(majS/maj.length)) + (0.4*(minS/min.length));
            await message.channel.send(`**Grade:** ${Math.round((result))}% (rounded from ${result}%)`);
        })();
    }
}