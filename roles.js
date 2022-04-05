const { Client, Intents, MessageEmbed, MessageReaction } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//Creates role from users message
function createRole(splitMessage, message) {
    if(splitMessage[2] != null){
        let roleArgs = splitMessage.slice(2).join(" ");


        message.guild.roles.create({
            name: roleArgs,
            
        })
        message.reply(`The "${roleArgs}" role has been created`)
    } else {
        message.reply("Please also type the name of the new role after createRole")
    }

}
//Gives a role to a user
function giveRole(splitMessage, message) {
    const target = message.mentions.users.first();
    const {guild} = message;
    if(splitMessage[3] != null){
        let roleArgs = splitMessage.slice(2).join(" ");
        let splitRoleArgs = roleArgs.split(" ");
        const person = guild.members.cache.get(target.id);

        roleName = splitRoleArgs[1];
        const role = guild.roles.cache.find((role) =>{
            return role.name === roleName
        }
        );
        if(!role){
            message.reply(`There is no"${roleName}" role `)
        } else{
            person.roles.add(role);
            message.reply(`User was given "${roleName}" role `)
        }
      
        
    } else {
        message.reply("Please also type the name of the new role and the persons name after giveRole")

    }

}


//Removes a role from a user
function removeRole(splitMessage, message) {
    const target = message.mentions.users.first();
    const {guild} = message;
    if(splitMessage[3] != null){
        let roleArgs = splitMessage.slice(2).join(" ");
        let splitRoleArgs = roleArgs.split(" ");
        const person = guild.members.cache.get(target.id);

        roleName = splitRoleArgs[1];
        const role = guild.roles.cache.find((role) =>{
            return role.name === roleName
        }
        );
        if(!role){
            message.reply(`There is no"${roleName}" role `)
        } else{
            person.roles.remove(role);
            message.reply(`User has been revoked of "${roleName}" role`)
        }
      

        
    } else {
        message.reply("Please also type the name of the new role and the persons name after giveRole")
        message.reply(`User was given "${roleName}" role `)
    }

}

module.exports = {
    createRole, giveRole, removeRole
}