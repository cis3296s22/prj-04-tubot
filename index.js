require('dotenv').config()
const { Client , Intents, MessageEmbed, MessageReaction } = require('discord.js')
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
        //test commit for pull request
        if(command.toLowerCase() == 'bye') {
            await message.reply("Goodbye!")
        }

        if (command.toLowerCase() == 'poll'){
            poll(splitMessage, message);
            
        }

        if (command.toLowerCase() == 'assign'){
            assign(splitMessage, message);
        }

        if(command.toLowerCase() == 'remind'){
            remind(message);
        }
    }
})

//Poll function
function poll(splitMessage, message){
    const nums = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"];
    //Error message if too few arguments ar given
    const pollEmbed = new MessageEmbed()
                .setTitle("How to make a poll")
                .setDescription("Ask a question for a yes or no poll\n" +
                "**Example: $tu poll Should we have class today?**\n\n" +
                "Or Put arguments at the end of the question seperated by a + for multiple choice poll\n"+
                "**Example: $tu poll Best Programming Language? + Java + Python + C**");
            if(!splitMessage[2]){//Check arguments
                message.channel.send({ embeds: [pollEmbed] }); 
            }else{
                //Join the poll back to gether
                let pollArgs = splitMessage.slice(2).join(" ");
                //Split up the choices
                let choices = pollArgs.split('+');
                if(!choices[1]){ //If no choices, make it a yes or no poll
                    message.channel.send("📋**" + pollArgs + "**\n").then(messageReaction => {
                        messageReaction.react("👍");
                        messageReaction.react("👎");
                        //Delete message after poll is made
                        message.delete(5000);
                    });
                    
                } else if (!choices[11]){ //If there are choice (less than 11), give a reaction to each choice
                    var pollReply = "";
                    //Set the title of the poll
                    pollReply += "📋**" + choices[0] + "**\n";
                    //Loop through the options and assign a reaction to each
                    for(var i = 1; i<choices.length;i++){
                        pollReply += nums[i-1] + ": " + choices[i] + "\n";
                    }
                    //Then reply with all the reactions so users can see
                    message.channel.send(pollReply).then(messageReaction => {
                        for(var i = 1; i<choices.length;i++){
                            messageReaction.react(nums[i-1]);
                        }
                        //Delete message after poll is made
                        message.delete(5000);
                    });
                }  
            }          
}

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