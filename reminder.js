const { Client , Intents, MessageEmbed, Message } = require('discord.js')
var dayjs = require('dayjs')
dayjs().format()

//array to hold assignments added via assign command
var assignments = [];
var autoRemindRunning = false;
var REMINDER_HOUR = 8; //default 8am

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

    //check if a date is given for the assignment
    let date = splitMessage[splitMessage.length-1];
    const formattedDate = dayjs(date).format("MM/DD");
    
    let addDate;
    if(formattedDate !== 'Invalid Date'){
        addDate = formattedDate.split("/"); //tuple with month and date
        addDate[0] = parseInt(addDate[0])
        addDate[1] = parseInt(addDate[1]) 
        splitMessage.pop();  //remove date from the assignment 
    }
    else    //no date given for assignment
        addDate = [13, 32]; //set to out of bounds date (will be sorted to end of array)

    let assignment = splitMessage.slice(2).join(" ");
    assignmentObj.assignment = assignment;

    assignmentObj.date = addDate;
    let dateWeight = addDate[0] * 32 + addDate[1];   //closer dates get smaller value, for sorting
    assignmentObj.dateWeight = dateWeight;
    assignments.push(assignmentObj);
    message.channel.send("Assignment successfully added")

    function assignSort(a, b){
        return a.dateWeight - b.dateWeight;
    }

    assignments.sort(assignSort);

    if(!autoRemindRunning){
        autoRemind(message);
        autoRemindRunning = true;
    }
}

//Academic Reminder
function remind(message){

    if(assignments.length < 1)
        return;

    let allAssignments = "";
    
    for(let i in assignments){      //build description of embed
        allAssignments += '- ' + assignments[i].assignment
        if(assignments[i].date[0] !== 13){
            allAssignments += ` ${assignments[i].date[0]}/${assignments[i].date[1]}`;
        };
        allAssignments += '\n';
    }

    const remindEmbed = new MessageEmbed()
            .setTitle("Assignments Due")
            .setDescription(allAssignments);

    message.channel.send({ embeds: [remindEmbed] });
}

function autoRemind(message){

    //send assignment reminder oncer per day at specified time
    const reminderDate = new Date();
    let REMINDER_DAY = reminderDate.getDate();

    setInterval(() => {
        const today = new Date();

        if(today.getDate() === REMINDER_DAY && today.getHours() === REMINDER_HOUR){
            const month = today.getMonth() + 1;
            const day = today.getDate();

            let todayAssignments = [];
            let tomAssignments = [];

            for(let i = 0; i < assignments.length; i++){
                //due date is today
                if(assignments[i].date[0] == month && assignments[i].date[1] == day){
                    todayAssignments.push(assignments[i]);
                    assignments.splice(i, 1);   //remove this assignment
                    i--;    //so indices dont get skipped over
                }
                //due date is tomorrow
                else if(assignments[i].date[0] == month && assignments[i].date[1] == day+1)
                    tomAssignments.push(assignments[i]);
            }

            let dueAssignments = "";
            if(todayAssignments.length > 0){
                dueAssignments += "**Due Today:**\n";
                for(let i in todayAssignments)
                    dueAssignments += '- ' + todayAssignments[i].assignment + '\n';
            }
            if(tomAssignments.length > 0){
                dueAssignments += "**Due Tomorrow:**\n";
                for(let i in tomAssignments)
                    dueAssignments += '- ' + tomAssignments[i].assignment + '\n';
            }

            //send reminder if there are any assignments due today or tomorrow
            if(dueAssignments !== ""){
                const remindEmbed = new MessageEmbed()
                            .setTitle(`Assignments Due ${month}/${day}`)
                            .setDescription(dueAssignments);

                message.channel.send({ embeds: [remindEmbed]});
            }

            //set REMINDER_DAY to be tomorrow
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            REMINDER_DAY = tomorrow.getDate();
        }
    }, 3600000) //3,600,000 = once per hour
}

function changeReminderHour(splitMessage, message){
    const assignEmbed = new MessageEmbed()
            .setTitle("Change Time of Auto Reminder")
            .setDescription("Use $tu remindtime to change when the automatic reminder sends\n" +
            "**Example: $tu remindtime 14**\n" + 
            "The time will be set to 2pm\n" +
            "*NOTE: Use 24 hour time*\n\n")

    if(!splitMessage[2]){   //no assignment given
        message.channel.send({ embeds: [assignEmbed] });
        return;
    }
    
    let newTime = parseInt(splitMessage[2]);
    if(newTime == NaN || newTime > 24 || newTime < 0){
        message.channel.send({ embeds: [assignEmbed] });
        return;
    }

    REMINDER_HOUR = newTime;

    let responseString = `Reminder time changed to ${newTime}:00 `;
    if(newTime == 24 || newTime == 0)   //midnight
        responseString += `(12:00 am)`;
    else if(newTime > 11)   //pm
        responseString += `(${newTime-12}:00 pm)`;
    else    //am
        responseString += 'am';

    message.channel.send(responseString)

}

module.exports = {
    assign, remind, autoRemind, changeReminderHour
}