const { Client , Intents, MessageEmbed } = require('discord.js')

// Create text channel function
function text(splitMessage , message) {
    const channelName = splitMessage[2]
    console.log(splitMessage)
    console.log(message.guild.channels)
    message.guild.channels.create(channelName , {
        type: 0 // 0 -> text
    })
    
    .then((channel) => { // Puts it into main text channel category
        const category = '937897944227667978' // Category ID
        channel.setParent(category)
    })
    message.channel.send("Text Channel created!");
}

// Create voice channel function
function voice(splitMessage , message) {
    const channelName = splitMessage[2]
    
    message.guild.channels.create(channelName , {
        type: 2 // 2 -> voice
    })

    .then((channel) => { // Puts it into main voice channel category
        const category = '937897944227667979' // Category ID
        channel.setParent(category)
    })
    message.channel.send("Voice Channel created!");
}

function textTest(splitMessage , message) {
    const channelName = splitMessage[2]
    message.channel.send("Text Channel created!");
}
function voiceTest(splitMessage , message) {
    const channelName = splitMessage[2]
    message.channel.send("Voice Channel created!");
}

module.exports = {
    text,
    voice,
    textTest,
    voiceTest
};