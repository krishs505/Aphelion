const { bot } = require("../../exports");

module.exports = {
    name: 'detonate',
    description: 'Loops through (most) members of Kihei\'s Universe and bans.',
    usage: ' ',
    cooldown: 2,
    od: true,
    execute(message, args) {
        (async () => {
            if (!args[0]) return message.channel.send("Confirm you'd like to ban all users (except those on the dontbanthese list) by typing `+detonate yes`.");
            if (args[0] !== "yes") return;

            await message.channel.send("Launching!");
            
            let dontbanthese = ["252980043511234560", "258265415770177536", "295591876357259265", "572927730707071006", "546340312713265173"];
            let adj = ["foolish","idiotic","simple-minded","unintelligent","low-witted","brainless","slow","empty-headed","asinine","benighted","bird-brained","blundering","brutish","brain-dead","clueless","dense","dim","dim-witted","dopey","dozy","dull","dumb","earthbound","feeble minded","lumpen","lumpish","subnormal","thick-headed","vacuous","weak-minded","dunderheaded","blinkard","addlepated","nescient","bêtise","stupid","aloof","arrogant","belligerent","big-headed","boastful","bossy","callous","careless","clingy","confrontational","cowardly","cruel","cynical","defensive","finicky","foolish","grumpy","gullible","hostile","idle","impolite","inconsiderate","indecisive","irresponsible","moody","nasty","smelly","overcritical","overemotional","patronizing","pessimistic","pompous","self-centered","silly","sullen","sus","thoughtless","touchy","untidy","vain","weak-willed","sharp as a marble","coccydynia","doltish","gowk","hebetude","kakistocracy","nescience","schlub","stolid","witling","detached","conceited","petulant","short-tempered","tantrum-throwing","bigoted","self-righteous","fussy","nihilistic","neurotic","resentful","rude","narrow-minded","pig-headed","lackadaisical","thoughtless","vacillating","vacuous","devoid-of-intelligence","artificial","conniving","con-artist","dishonest","fawning","malicious","shifty","scheming","untrustworthy","irascible","malevolent","manipulative","possessive","predatory","violent","antisocial","finicky","gullible","ignorant","meddlesome","melodramatic","obnoxious","ostentatious","vulgar","inappropriate","barren","bullshitting","dirty","greedy","heartless","mediocre at very best","pinhead","puck","shit brick","useless","window-faced","derogatory","derpy"];
            let anornot = "";
            let vowels = ["a", "e", "i", "o", "u"];
            let count = 0;

            let total = 0;
            await message.guild.members.fetch().then(members => {
                members.forEach(async member => {
                    if (member.user.bot) return;
                    if (dontbanthese.indexOf(member.user.id) !== -1) return;
                    total++;
                })
            })

            await message.guild.members.fetch().then(members => {
                members.forEach(async member => {
                    if (member.user.bot) return;
                    if (dontbanthese.indexOf(member.user.id) !== -1) return;
                    await member.ban();

                    count++;
                    anornot = "a";
                    let a = adj[bot.randomInt(0, adj.length - 1)];
                    if (vowels.indexOf(a[0]) !== -1) anornot += "n";
                    await message.channel.send(`(${count}/${total}) Successfully banned ${anornot} ${a} user <@${member.user.id}>!`);
                })
            })

            await message.guild.channels.fetch().then(channels => {
                channels.forEach(async channel => {
                    if (channel.type !== "GUILD_TEXT") return;
                    console.log(channel.type)
                    let C = await message.client.channels.cache.get(channel.id);
                    await C.send(":skull:");
                })
            })
        })();
    }
}