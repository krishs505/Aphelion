const { bot } = require("../../exports");
const sSchema = require('../../schemas/server-data-schema');
const sID = "627af10e6146c4f52db2a862";
const QuickChart = require('quickchart-js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'stats',
    description: "Get some server stats of the last x number of days.",
    usage: '[optional number of days]',
    cooldown: 5,
    execute(message, args) {
        (async () => {
            const data = await sSchema.findById(sID);

            let days;

            if (!args[0]) {
                days = data.counts.length;
            } else {
                days = parseInt(args[0]);
            }

            if (isNaN(days) || days < 1) return message.channel.send("Invalid number of days!");

            if (days > data.counts.length)
                days = data.counts.length;

            let avg = 0;
            let dates = [];
            let counts = [];
            for (var i = data.counts.length - days; i < data.counts.length; i++) {
                avg += data.counts[i];
                dates.push(data.dates[i]);
                counts.push(data.counts[i]);
            }
            avg /= days;

            const chart = new QuickChart();
            chart.setConfig({
                type: 'bar',
                data: { labels: dates, datasets: [{ label: '# messages', data: counts }] },
            });

            const e = new MessageEmbed()
                .setTitle(`Server Activity in the last ${days} days`)
                .setImage(chart.getUrl())
                .addField("Avg messages/day", avg.toString())
                .setColor('#0099FF')
                .setTimestamp(new Date().toISOString());
            
            
            await message.channel.send({ embeds: [e] });
        })();
    }
}