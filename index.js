require('dotenv').config()
const { Client , Intents, MessageEmbed, MessageReaction } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const poll = require("./poll.js");
const reminder = require("./reminder.js")
const channel = require("./channel.js")


const help = require("./help.js")
const roles = require("./roles.js")

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
        //test commit for pull request
        if(command.toLowerCase() == 'bye') {
            await message.reply("Goodbye!")
        }

        if(command.toLowerCase() == 'help'){
            help.help(splitMessage, message);
            //await message.reply("Commands: $tu hello, $tu bye, $tu poll, $tu assign, $tu remind")
        }

        if (command.toLowerCase() == 'poll'){
            poll.poll(splitMessage, message);
        }

        if (command.toLowerCase() == 'assign'){
            reminder.assign(splitMessage, message);
        }

        if(command.toLowerCase() == 'remind'){
            reminder.remind(message);
        }

        if(command.toLowerCase() == 'remindtime'){
            reminder.changeReminderHour(splitMessage, message);
        }

        if(command.toLowerCase() == 'assigndelete'){
            reminder.deleteAssignment(splitMessage, message);
        }

        if(command.toLowerCase() == 'assignclear'){
            reminder.clearAssignments(message);
        }

        if(command.toLowerCase() == 'createrole'){
            roles.createRole(splitMessage,message);
        }

        if(command.toLowerCase() == 'giverole'){
            roles.giveRole(splitMessage,message);
        }

        if(command.toLowerCase() == 'removerole'){
            roles.removeRole(splitMessage,message);
        }
        if(command.toLowerCase() == 'textchat') {
            channel.text(splitMessage , message);
        }
        if(command.toLowerCase() == 'voicechat') {
            channel.voice(splitMessage , message);

        }
    }
})

client.login(process.env.DISCORD_BOT_TOKEN)


//Erin's test commit
 
//Tommy's test commit

//Ryan's test commit