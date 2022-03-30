require('dotenv').config()
const { Client , Intents, MessageEmbed, MessageReaction } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const poll = require("./poll.js");

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
            await message.reply("Commands: $tu hello, $tu bye, $tu poll, $tu assign, $tu remind")
        }

        if (command.toLowerCase() == 'poll'){
            poll.poll(splitMessage, message);
        }

        if (command.toLowerCase() == 'assign'){
            assign(splitMessage, message);
        }

        if(command.toLowerCase() == 'remind'){
            remind(message);
        }
    }
})

//array to hold assignments added via assign command
var assignments = [];

//Add assignment to reminders list
function assign(splitMessage, message){
    
    const assignEmbed = new MessageEmbed()
            .setTitle("How to add assignment")
            .setDescription("Use $tu assign to add an assignment\n" +
            "**Example: $tu assign Quiz 2 3/29**\n\n")

    if(!splitMessage[2]){   //no assignment given
        message.channel.send({ embeds: [assignEmbed] });
        return;
    }

    let assignment = splitMessage.slice(2).join(" ");
    assignments.push(assignment);
    message.channel.send("Assignment successfully added")
}

//Academic Reminder
function remind(message){

    if(assignments.length < 1)
        return;

    let allAssignments = "";
    
    for(let i in assignments){      //build description of embed
        allAssignments += '- ' + assignments[i] + '\n';
    }

    const remindEmbed = new MessageEmbed()
            .setTitle("Assignments Due")
            .setDescription(allAssignments);

    message.channel.send({ embeds: [remindEmbed] });
}

client.login(process.env.DISCORD_BOT_TOKEN)


//Erin's test commit
 
//Tommy's test commit

//Ryan's test commit