require('dotenv').config()
const { Client , Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready' , () => {
    console.log('TU Bot is online!')
})

client.on('message' , async message => {
    const splitMessage = message.content.split(' ')
    if(splitMessage[0] == '$tu') {
        const command = splitMessage[1]

        if(!command) {
            return
        }
        if(command.toLowerCase() == 'hello') {
            await message.reply("Hi!")
        }
    }
})

client.login(process.env.DISCORD_BOT_TOKEN)