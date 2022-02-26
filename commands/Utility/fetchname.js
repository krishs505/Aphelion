const {
    bot
} = require('../../exports')

module.exports = {
    name: 'fetchname',
    usage: '[name]',
    aliases: ['name', 'findname'],
    cooldown: 2,
    description: 'Fetch a guild member using their name.',
    od: true,
    execute(message, args) {
        (async () => {
            if (!args[0]) return message.channel.send('Please provide a name!');

            var sf = args.join(" ");
            let members = [];
            await message.guild.members.fetch().then(fM => {
                fM.forEach(m => {
                    // console.log(m.user.username);
                    // console.log(m.user.username.toLowerCase())
                    // console.log(args[0].toLowerCase())

                    // var ne = true;
                    if (m.user.username.toLowerCase().includes(sf.toLowerCase()) || (m.nickname && m.nickname.toLowerCase().includes(sf.toLowerCase()))) {
                        members.push(`- <@${m.user.id}>`);
                    }
                })
            })

            if (members.length !== 0) {
                message.channel.send(`The following member(s) with \`${sf}\` in their name were found:\n${members.join('\n')}`);
                console.log(members)
            } else {
                message.channel.send(`:x: No members with \`${sf}\` in their name were found!`);
            }
        })();
    },
};