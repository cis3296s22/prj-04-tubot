const { Client, Intents, MessageEmbed, MessageReaction } = require('discord.js')

function help(splitMessage, message) {
    const commands = [
    {["`$tu hello`"] : "Has the bot say \"Hi!\""},
    {["`$tu bye`"] : "Has the bot say \"Goodbye!\""},
    {["`$tu poll`"] : "Creates a poll in the channel that members can vote on"},
    {["`$tu assign`"] : "Adds an assignment to the reminder list"},
    {["`$tu remind`"] : "Sends embed containing all assignments"},
    {["`$tu remindtime`"] : "Sets time that automatic reminders are sent"},
    {["`$tu assigndelete`"] : "Deletes an assignment"},
    {["`$tu assignclear`"] : "Clears all assignments"},
    {["`$tu createRole`"] : "Creates role from users message"},
    {["`$tu giveRole`"] : "Givess a role to a user"},
    {["`$tu removeRole`"] : "Removes a role from a user"},
    {["`$tu msgRole`"] : "Sends a message to all members with a given role"},
    {["`$tu textchat`"] : "Creates a text chat channel"},
    {["`$tu voicechat`"] : "Creates a voice chat channel"},
    {["`$tu help`"] : "Shows this"},];

    let output = "Here is the full list of commands for TU Bot:\n";

    for (var i = 0; i<commands.length; i++){
        for (var key in commands[i]){
            output += ( key + ": " + commands[i][key] + "\n");
        }
    }
    message.channel.send(output);
}

module.exports = { help };