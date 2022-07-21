const { bot } = require("../../exports");

// const fs = require('fs');
// const { EndBehaviorType, VoiceReceiver } = require( '@discordjs/voice');
// const { User } = require('discord.js');
// const { createWriteStream } = require('node:fs');
// const prism = require('prism-media');
// const { pipeline } = require('node:stream');

module.exports = {
    name: 'enter',
    description: 'UHH',
    usage: '',
    cooldown: 0,
    od: true,
    execute(message, args) {

        /*
        const voiceChannel = message.member.voice.channel;
        
        const voiceConnection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            selfDeaf: false
        })

        const userId = "252980043511234560";
        const receiver = { voiceConnection };

        const opusStream = receiver.subscribe(userId, {
            end: {
                behavior: EndBehaviorType.AfterSilence,
                duration: 100,
            },
        });
    
        const oggStream = new prism.opus.OggLogicalBitstream({
            opusHead: new prism.opus.OpusHead({
                channelCount: 2,
                sampleRate: 48000,
            }),
            pageSizeControl: {
                maxPackets: 10,
            },
        });
    
        const filename = `./recordings/${Date.now()}-yes.ogg`;
    
        const out = createWriteStream(filename);
    
        console.log(`👂 Started recording ${filename}`);
    
        pipeline(opusStream, oggStream, out, (err) => {
            if (err) {
                console.warn(`❌ Error recording file ${filename} - ${err.message}`);
            } else {
                console.log(`✅ Recorded ${filename}`);
            }
        });

        */
    }
}