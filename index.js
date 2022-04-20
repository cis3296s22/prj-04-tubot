/** @module index */
/** @interface Discord */

require('dotenv').config()

/** @constructor Intents */
/** @constructor MessageEmbed */
/** @constructor MessageReaction */
/** @constructor Client */

const { Client , Intents, MessageEmbed, MessageReaction } = require('discord.js')
/**
 * @const {Client} client
 * 
*/
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS ] });
/**
 * @requires help */
const help = require("./help.js")
/**@requires poll */
const poll = require("./poll.js");
/**@requires reminder */
const reminder = require("./reminder.js")
/**@requires generateGroups */
const generateGroups = require("./generateGroups.js")
/**@requires roles */
const roles = require("./roles.js")
/**@requires channel */
const channel = require("./channel.js")
/**@requires notification */
const notification = require("./notification.js")

/**
 * @event Client#on
 * @desc Listening function for client on event
 * @property {string} ready
 * @property {string} message
 * @property {async} message
*/
client.on('ready' , () => {
    console.log('TU Bot is online!')
})

client.on('message' , async message => {
    const splitMessage = message.content.split(' ')

    if(message.member.roles.cache.some(r => r.name === "Admin")){
        if(splitMessage[0] == '$tu') {
            const command = splitMessage[1]
        
            if(!command) {
                return
            }
            if(command.toLowerCase() == 'hello') {
                await message.reply("Hi!")
            }
            //test commit for pull request
            if(command.toLowerCase() == 'bye') {
                await message.reply("Goodbye!")
            }

            if(command.toLowerCase() == 'help'){
                help.help(splitMessage, message);
            }

            if (command.toLowerCase() == 'poll'){
                poll.poll(splitMessage, message);
            }

            if (command.toLowerCase() == 'assign'){
                reminder.assign(splitMessage, message);
            }

            if(command.toLowerCase() == 'remind'){
                reminder.remind(message);
            }

            if(command.toLowerCase() == 'remindtime'){
                reminder.changeReminderHour(splitMessage, message);
            }

            if(command.toLowerCase() == 'assigndelete'){
                reminder.deleteAssignment(splitMessage, message);
            }

            if(command.toLowerCase() == 'assignclear'){
                reminder.clearAssignments(message);
            }

            if(command.toLowerCase() == 'createrole'){
                roles.createRole(splitMessage,message);
            }

            if(command.toLowerCase() == 'giverole'){
                roles.giveRole(splitMessage,message);
            }

            if(command.toLowerCase() == 'removerole'){
                roles.removeRole(splitMessage,message);
            }

            if(command.toLowerCase() == 'msgrole'){
                roles.messageRole(splitMessage, message);
            }

            if(command.toLowerCase() == 'textchat') {
                channel.text(splitMessage , message);
            }

            if(command.toLowerCase() == 'voicechat') {
            channel.voice(splitMessage , message);
            }

            if(command.toLowerCase() == 'notify'){
                notification.notify(splitMessage, message)
            }
      
            if(command.toLowerCase() == 'generategroups') {
                generateGroups.generateGroups(splitMessage , message);
            }
        }
    }
})
/**
 * @event Client#login
 * @desc Listening function for client login event
 * @property {process.env} DISCORD_BOT_TOKEN
 */
client.login(process.env.DISCORD_BOT_TOKEN)