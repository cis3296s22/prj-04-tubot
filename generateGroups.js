const { Client, Intents, MessageEmbed, MessageReaction } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//Generates random groups
function generateGroups(splitMessage, message) {
    const groupEmbed = new MessageEmbed()
    .setTitle("How to generate groups")
    .setDescription("");

    if (!splitMessage[2]) {//Check arguments
        message.channel.send({ embeds: [groupEmbed] });
    } else if(!splitMessage[3]){
        message.reply("Please include a name for the groups");
    } else if(!splitMessage[4]){

    } else{
        message.reply("Too many arguments");
    }
}

module.exports = { generateGroups };