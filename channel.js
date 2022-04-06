const { Client , Intents, MessageEmbed } = require('discord.js')

// Create text channel function
function text(splitMessage , message) {
    const channelName = splitMessage[2]

    message.guild.channels.create(channelName , {
        type: 0 // 0 -> text
    })
    
    .then((channel) => { // Puts it into main text channel category
        const category = '937897944227667978' // Category ID
        channel.setParent(category)
    })
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
}

module.exports = {
    text,
    voice
};