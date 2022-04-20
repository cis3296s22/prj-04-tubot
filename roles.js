/** @module roles */
const { Client, Intents, MessageEmbed, MessageReaction } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });



/**Creates role from users message 
 * @alias module:roles~createRole 
 * @param {string} splitMessage
 * @param {string} message
*/
function createRole(splitMessage, message) {
    /**Message to inform user on how to use the createRole command
     * @const {MessageEmbed} createEmbed
     * @protected
     */ 
    const createEmbed = new MessageEmbed()
    .setTitle("How to create a role")
    .setDescription("Type the new role name after the command\n" +
        "**Example: $tu createRole UserRole**");
    //Then we will instantiate the guild
    const {guild} = message;
    //If it is the correct amount of args
    if(splitMessage[2] != null){
        //Split it up and set it as the role name
        let roleArgs = splitMessage.slice(2).join(" ");
        roleName = roleArgs;
        
        //Find the role if it is already a role
        const role = guild.roles.cache.find((role) =>{
            return role.name === roleName
        }
        );
        //If it is already a role
        if(role){
            //let the user know
            message.reply(`There is already a "${roleName}" role `)
        } else {
            //Otherwise carry on with the creation of the new role
            message.guild.roles.create({
                name: roleArgs,
            
            })
            //Inform user the role was made
            message.reply(`The "${roleArgs}" role has been created`)
        }
    } else {
        //Case if there are no other arguments passed
        message.channel.send({ embeds: [createEmbed] });
    }
}

/**Gives a role to a user
 * @alias module:roles~giveRole 
 * @param {string} splitMessage
 * @param {string} message
*/
function giveRole(splitMessage, message) {
    /**Message to inform user on how to use the createRole command
     * @const {MessageEmbed} giveEmbed
     * @protected
     */ 
    const giveEmbed = new MessageEmbed()
    .setTitle("How to give a user a role")
    .setDescription("Type @ user name and the role you want to give\n" +
        "**Example: $tu giveRole @user UserRole**");
    
    //Set the target user of the role giving
    const target = message.mentions.users.first();

    //Then instatiate guild
    const {guild} = message;
    if(!target){//If no target
        //inform user
        message.reply(`Make sure you use @ to specify the user`)
    } else if(splitMessage[4] != null) { //If too many arguments
        message.reply("Too many arguments")
    } else if(splitMessage[3] != null){ //Correct usage case
        //Split it up
        let roleArgs = splitMessage.slice(2).join(" ");
        let splitRoleArgs = roleArgs.split(" ");

        //Get the person from the mention from earlier
        const person = guild.members.cache.get(target.id);

        //Then set the role name
        roleName = splitRoleArgs[1];
        //Find it and set it
        const role = guild.roles.cache.find((role) =>{
            return role.name === roleName
        }
        );
        if(!role){//If there is no role
            message.reply(`There is no "${roleName}" role `)
        } else if(!person){//If there is no person
            message.reply(`Make sure you use @ to specify the user`)
        } else{ //Correct case
            //Give user role and inform user
            person.roles.add(role);
            message.reply(`User was given "${roleName}" role `)
        }
      
    //If they mentioned someone but didn't add a role    
    } else if(splitMessage[2] != null) {
        message.reply("Please specify role")
    }else {
        //No args case
        message.channel.send({ embeds: [giveEmbed] });
    }

}



/**Removes a role from a user 
 * @alias module:roles~removeRole 
 * @param {string} splitMessage
 * @param {string} message
*/
function removeRole(splitMessage, message) {
    /**Message to inform user on how to use the createRole command
     * @const {MessageEmbed} removeEmbed
     * @protected
     */ 
    const removeEmbed = new MessageEmbed()
    .setTitle("How to revoke a user's role")
    .setDescription("Type @ user name and the role you want to revoke\n" +
        "**Example: $tu removeRole @user UserRole**");
    
    //Get the person from the mention from earlier
    const target = message.mentions.users.first();
    
    //Then instatiate guild
    const {guild} = message;

    if(!target){//If no person
        message.reply(`Make sure you use @ to specify the user`)
    } else if(splitMessage[4] != null) {//If too many args
        message.reply("Too many arguments")
    } else if(splitMessage[3] != null){//Correct case
        //Split it up
        let roleArgs = splitMessage.slice(2).join(" ");
        let splitRoleArgs = roleArgs.split(" ");

        //Get the person from the mention from earlier
        const person = guild.members.cache.get(target.id);

        //Then set the role name
        roleName = splitRoleArgs[1];
        //Find it and set it
        const role = guild.roles.cache.find((role) =>{
            return role.name === roleName
        }
        );
        if(!role){ //If no role
            message.reply(`There is no "${roleName}" role `)
        } else{//Otherwise remove there role
            if(person.roles.remove(role)){
                //Inform user it was removed
                message.reply(`User has been revoked of "${roleName}" role`)
            } else{
                //Inform user that they dont have that role already
                message.reply(`User does not have "${roleName}" role`)
            }
        }
        
    } else if(splitMessage[2] != null) {//If they mentioned someone but forgot to add a role
        message.reply("Please specify role")
    } else { //Empty Args
        message.channel.send({ embeds: [removeEmbed] });
    }

}


/**Send message to every user with a role 
 * @alias module:roles~messageRole 
 * @param {string} splitMessage
 * @param {string} message
*/
function messageRole(splitMessage, message) {
    
    message.delete()

    const errorEmbed = new MessageEmbed()
        .setTitle("How to message a role")
        .setDescription("Type $tu msgRole <rolename> <message>\n" +
            "**Example: $tu msgRole Admin This is a direct message to the Admin role!**");
    
    const {guild} = message;
    if(splitMessage[3]){
        const roleName = splitMessage[2];

        message.guild.members.fetch().then(members =>{

            const role = guild.roles.cache.find((role) =>{
                return role.name === roleName
            });

            if(!role){
                message.channel.send(`Role ${roleName} was not found`)
                return
            }

            let filteredMembers = [];
            members.forEach((value, key) => {
                //console.log(value)
                if(value._roles.includes(role.id))
                    filteredMembers.push(value)
            })

            let dm = splitMessage.slice(3).join(" ");
            //Send DM to each user in filteredMembers
            filteredMembers.forEach(user => {
                user.send(dm)
            })
        })
    }

    else
        message.channel.send({ embeds: [errorEmbed] });
}

module.exports = {
    createRole, giveRole, removeRole, messageRole
}