const { bot } = require("../../exports");

const swSchema = require('../../schemas/stopwatch-schema');
const dID = "61fef7ccefe7184ded54ffcf";

function milliDisplayTime(time) { // Convert milliseconds to a displayable format
    time /= 1000;

    var sec = Math.round(1000 * (time % 60)) / 1000;
    var min = ((time - sec) / 60) % 60;
    var hr = Math.floor((time - sec) / 3600);

    var timeStr = [];

    if (hr !== 0) timeStr.push(`${hr}h`);
    if (min !== 0) timeStr.push(`${min}m`);
    if (sec !== 0) timeStr.push(`${sec}s`);

    return timeStr.join(" ");
}

module.exports = {
    name: 'stopwatch',
    description: "Simple stopwatch with pausing capabilities.",
    usage: '[start/stop/now/pause/unpause]',
    aliases: ['sw'],
    cooldown: 3,
    od: true,
    execute(message, args) {
        (async () => {

            if (!args[0]) return message.channel.send("Provide start/stop/now/pause/unpause!");

            const swData = await swSchema.findById(dID);

            var now = Date.now();
            var time;

            switch (args[0].toLowerCase()) {
                case 'start':

                    if (swData.state !== "n") return message.channel.send("There is already a running stopwatch!");
                    
                    await swSchema.updateOne({ startingTime: swData.startingTime }, { startingTime: now });
                    await swSchema.updateOne({ state: swData.state }, { state: "running" });

                    await message.channel.send('Successfully began the stopwatch!');

                break;
                case 'stop':

                    if (swData.state === "n") return message.channel.send("There is no running stopwatch to stop!");

                    await swSchema.updateOne({ state: swData.state }, { state: "n" });

                    time = now - swData.startingTime;
                    if (swData.totalPausedTime !== 0) time -= swData.totalPausedTime;

                    if (swData.state === "paused") {
                        time -= (now - swData.pausedTime);
                    }

                    await message.channel.send(`Stopwatch stopped at ${milliDisplayTime(time)}!`);
                    
                    await swSchema.updateOne({ totalPausedTime: swData.totalPausedTime }, { totalPausedTime: 0 });

                break;
                case 'now':

                    if (swData.state === "n") return message.channel.send("There is no running stopwatch!");

                    if (swData.state === "running") await message.channel.send(`Stopwatch at ${milliDisplayTime(now - swData.startingTime)} and running!`);
                    if (swData.state === "paused") await message.channel.send(`Stopwatch paused at ${milliDisplayTime(now - swData.startingTime)}!`);

                break;
                case 'pause':

                    if (swData.state === "n") return message.channel.send("There is no running stopwatch to pause!");
                    if (swData.state === "paused") return message.channel.send("The stopwatch is already paused!");

                    time = now - swData.startingTime;
                    await swSchema.updateOne({ pausedTime: swData.pausedTime }, { pausedTime: now });
                    await swSchema.updateOne({ state: swData.state }, { state: "paused" });

                    await message.channel.send(`Stopwatch paused at ${milliDisplayTime(time)}!`);

                break;
                case 'unpause' || 'resume':

                    if (swData.state === "n") return message.channel.send("There is no running stopwatch to unpause!");
                    if (swData.state === "running") return message.channel.send("The stopwatch isn't paused!");

                    time = now - swData.pausedTime;
                    await swSchema.updateOne({ totalPausedTime: swData.totalPausedTime }, { totalPausedTime: swData.totalPausedTime + time });
                    await swSchema.updateOne({ state: swData.state }, { state: "running" });

                    await message.channel.send(`Stopwatch unpaused at ${milliDisplayTime(swData.pausedTime - swData.startingTime)}!`);

                break;
            }

        })();
    }
}