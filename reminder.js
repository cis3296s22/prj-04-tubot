const { Client , Intents, MessageEmbed } = require('discord.js')

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

module.exports = {
    assign, remind
}