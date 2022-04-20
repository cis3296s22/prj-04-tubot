
const { Client, Intents, MessageEmbed, MessageReaction } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

/** 
 * @module generateGroups 
*/
/** Generates random groups
 * @alias module:generateGroups~generateGroups
 * @param {string} splitMessage
 * @param {string} message
 */
function generateGroups(splitMessage, message) {
    /**Message to inform user how to use the command
     * @const {MessageEmbed} groupEmbed
     * @protected
     */  
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

        //Loop for the amount of groups wanted to make
        for(let i = 0; i<splitMessage[2]; i++){
            //Make a role that has i appended to the end
            message.guild.roles.create({
                name: splitMessage[3] + "_Group" + (i+1),
            
            })
            //Then we will make a private channel for the role
            .then((role) => {
                message.guild.channels.create(splitMessage[2] + "_Group" + (i+1) , {
                    type: 0, // 0 -> text
                    permissionOverwrites: [
                        {type: 'role', id: role.id, allow: [Permissions.FLAGS.VIEW_CHANNEL]},
                        {type: 'role', id: everyoneRole.id, deny: [Permissions.FLAGS.VIEW_CHANNEL]},
                    ],
                })
                /*.then((channel) => { // Puts it into main text channel category
                    const category = '937897944227667978' // Category ID
                    channel.setParent(category)
                })*/
                
            })
        }
        //Inform user it executed correctly
        message.reply("The groups have been created");
    } else{ //Case for too many arguments
        message.reply("Too many arguments");
    }
    
}

module.exports = { generateGroups };