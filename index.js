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

    }
})

//Poll function
function poll(splitMessage, message){
    
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
                    message.channel.send(pollArgs).then(messageReaction => {
                        messageReaction.react("👍");
                        messageReaction.react("👎");
                    });
                    //TODO: Delete original message
                } else { //If there are choice, give a reaction to each choice
                    message.channel.send(pollArgs).then(messageReaction => {
                        for(var i = 1; i<choices.length;i++){
                            messageReaction.react(i.toString);
                            }
                        });
                    //TODO: Delete original message
                    //Give multiple choice reactions
                }  
            }          
}



client.login(process.env.DISCORD_BOT_TOKEN)


//Erin's test commit
 
//Tommy's test commit

//Ryan's test commit