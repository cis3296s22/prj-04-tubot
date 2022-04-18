const { Client, Intents, MessageEmbed} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//Generates random groups
async function generateGroups(splitMessage, message) {
    //Message to inform user how to use the command
    const groupEmbed = new MessageEmbed()
    .setTitle("How to generate groups")
    .setDescription("Type in the number of groups you want to generate and the name\n"
     +"**Example: $tu generateGroups 3 Lab1**");


    const {guild} = message;
    const { Permissions } = require('discord.js');
    //If just command send instructions
    if (!splitMessage[2]) {//Check arguments
        message.channel.send({ embeds: [groupEmbed] });
    //If number of groups is there but no names tell user
    } else if(!splitMessage[3]){
        message.reply("Please include a name for the groups");
    //Otherwise we will execute the code
    } else if(!splitMessage[4]){
        //Set a variable for the everybody role
        const everyoneRole = guild.roles.everyone;
        
        //Get all members of the server
        const members = await guild.members.fetch()
       
        var i = 0;
        var memberList = [];
        //Then we will put them into an array except the bot and the user that called this
        members.forEach(member=> {
            
            if(message.author.id != member.user.id && !member.user.bot){
                memberList[i] = member;
                i++;
            }
        })
        //Randomly mixing up the array
        for (let i = memberList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = memberList[i];
            memberList[i] = memberList[j];
            memberList[j] = temp;
        }

        //Loop for the amount of groups wanted to make
        for(let i = 0; i<splitMessage[2]; i++){
            
            //Make a role that has i appended to the end
            message.guild.roles.create({
                name: splitMessage[3] + "_Group" + (i+1),
            
            })
            
            //Then we will make a private channel for the role
            .then((role) => {
                message.guild.channels.create(splitMessage[3] + "_Group" + (i+1) , {
                    type: 0, // 0 -> text
                    permissionOverwrites: [
                        {type: 'role', id: role.id, allow: [Permissions.FLAGS.VIEW_CHANNEL]},
                        {type: 'role', id: everyoneRole.id, deny: [Permissions.FLAGS.VIEW_CHANNEL]},
                        {type: 'member', id: message.author.id , allow: [Permissions.FLAGS.VIEW_CHANNEL]},
                    ],
                })
                /*.then((channel) => { // Puts it into main text channel category
                    const category = '937897944227667978' // Category ID
                    channel.setParent(category)
                })*/
                
                //Put people into the group
                for(var z = 0 + i; z<memberList.length; z = z+ parseInt(splitMessage[2])){
                    memberList[z].roles.add(role);
                }
                     
            })
            

        }
        //Inform user it executed correctly
        message.reply("The groups have been created");
    } else{ //Case for too many arguments
        message.reply("Too many arguments");
    }
    
}

module.exports = { generateGroups };