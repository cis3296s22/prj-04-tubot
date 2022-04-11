const { Client, Intents, MessageEmbed, MessageReaction } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//Creates role from users message
function createRole(splitMessage, message) {
    const createEmbed = new MessageEmbed()
    .setTitle("How to create a role")
    .setDescription("Type the new role name after the command\n" +
        "**Example: $tu createRole UserRole**");
    const {guild} = message;
    if(splitMessage[2] != null){
        let roleArgs = splitMessage.slice(2).join(" ");
        roleName = roleArgs;
        console.log(roleName)
        const role = guild.roles.cache.find((role) =>{
            return role.name === roleName
        }
        );
        if(role){
            message.reply(`There is already a "${roleName}" role `)
        } else {
            message.guild.roles.create({
                name: roleArgs,
            
            })
            message.reply(`The "${roleArgs}" role has been created`)
        }
    } else {
        message.channel.send({ embeds: [createEmbed] });
    }
}
//Gives a role to a user
function giveRole(splitMessage, message) {
    const giveEmbed = new MessageEmbed()
    .setTitle("How to give a user a role")
    .setDescription("Type @ user name and the role you want to give\n" +
        "**Example: $tu giveRole @user UserRole**");
    const target = message.mentions.users.first();
    const {guild} = message;
    if(!target){
        message.reply(`Make sure you use @ to specify the user`)
    } else if(splitMessage[4] != null) {
        message.reply("Too many arguments")
    } else if(splitMessage[3] != null){
        let roleArgs = splitMessage.slice(2).join(" ");
        let splitRoleArgs = roleArgs.split(" ");
        const person = guild.members.cache.get(target.id);

        roleName = splitRoleArgs[1];
        const role = guild.roles.cache.find((role) =>{
            return role.name === roleName
        }
        );
        if(!role){
            message.reply(`There is no "${roleName}" role `)
        } else if(!person){
            message.reply(`Make sure you use @ to specify the user`)
        } else{
            person.roles.add(role);
            message.reply(`User was given "${roleName}" role `)
        }
      
        
    } else if(splitMessage[2] != null) {
        message.reply("Please specify role")
    }else {
        
        message.channel.send({ embeds: [giveEmbed] });
    }

}


//Removes a role from a user
function removeRole(splitMessage, message) {
    const removeEmbed = new MessageEmbed()
    .setTitle("How to revoke a user's role")
    .setDescription("Type @ user name and the role you want to revoke\n" +
        "**Example: $tu removeRole @user UserRole**");
    const target = message.mentions.users.first();
    
    const {guild} = message;
    if(!target){
        message.reply(`Make sure you use @ to specify the user`)
    } else if(splitMessage[4] != null) {
        message.reply("Too many arguments")
    } else if(splitMessage[3] != null){
        let roleArgs = splitMessage.slice(2).join(" ");
        let splitRoleArgs = roleArgs.split(" ");
        const person = guild.members.cache.get(target.id);

        roleName = splitRoleArgs[1];
        const role = guild.roles.cache.find((role) =>{
            return role.name === roleName
        }
        );
        if(!role){
            message.reply(`There is no "${roleName}" role `)
        } else{
            if(person.roles.remove(role)){
                message.reply(`User has been revoked of "${roleName}" role`)
            } else{
                message.reply(`User does not have "${roleName}" role`)
            }
        }
      

        
    } else if(splitMessage[2] != null) {
        message.reply("Please specify role")
    } else {
        message.channel.send({ embeds: [removeEmbed] });
    }

}

module.exports = {
    createRole, giveRole, removeRole
}