const { Client , Intents, MessageEmbed, MessageReaction } = require('discord.js')

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

module.exports = {poll};