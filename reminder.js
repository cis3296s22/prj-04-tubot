const { Client , Intents, MessageEmbed } = require('discord.js')
var dayjs = require('dayjs')
dayjs().format()

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

    const assignmentObj = {}
    let assignment = splitMessage.slice(2).join(" ");
    assignmentObj.assignment = assignment;

    let date = splitMessage[splitMessage.length-1];
    const formattedDate = dayjs(date).format("MM/DD");
    console.log(typeof(formattedDate) + "  " + formattedDate)
    
    let addDate;
    if(formattedDate !== 'Invalid Date'){
        addDate = formattedDate.split("/"); //tuple with month and date
        addDate[0] = parseInt(addDate[0])
        addDate[1] = parseInt(addDate[1])   
    }
    else    //no date given for assignment
        addDate = [13, 32];

    console.log("Month " + addDate[0] + " Day " + addDate[1])
    assignmentObj.date = addDate;
    let dateWeight = addDate[0] * 32 + addDate[1];   //closer assignments get smaller value
    assignmentObj.dateWeight = dateWeight;
    assignments.push(assignmentObj);
    console.log("Weight " + dateWeight)
    message.channel.send("Assignment successfully added")

    function assignSort(a, b){
        return a.dateWeight - b.dateWeight;
    }

    assignments.sort(assignSort);
}

//Academic Reminder
function remind(message){

    if(assignments.length < 1)
        return;

    let allAssignments = "";
    
    for(let i in assignments){      //build description of embed
        allAssignments += '- ' + assignments[i].assignment + '\n';
    }

    const remindEmbed = new MessageEmbed()
            .setTitle("Assignments Due")
            .setDescription(allAssignments);

    message.channel.send({ embeds: [remindEmbed] });
}

function autoRemind(message){
    setInterval((message) => {

    }, 3600000) //once per hour
}

module.exports = {
    assign, remind, autoRemind
}