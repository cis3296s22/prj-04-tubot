# TU-Bot
TU-Bot is a practical implementation of a multi-purpose Discord bot with the intended use for professors and students to effectively communicate and use meaningful tools in the Discord application.

# Commands

- $tu hello: Has the bot say "Hi!"
- $tu bye: Has the bot say "Goodbye!"
- $tu poll: Creates a poll in the channel that members can vote on
- $tu assign: Adds an assignment to the reminder list
- $tu remind: Sends embed containing all assignments
- $tu remindtime: Sets time that automatic reminders are sent
- $tu assigndelete: Deletes an assignment
- $tu assignclear: Clears all assignments
- $tu createRole: Creates role from users message
- $tu giveRole: Gives a role to a user
- $tu removeRole: Removes a role from a user
- $tu msgRole: Sends a message to all members with a given role
- $tu textchat: Creates a text chat channel
- $tu voicechat: Creates a voice chat channel
- $tu notify: Create announcements and notify users with NotifyRole
- $tu help: Displays this list of commands and their descriptions

# First time set-up
- Download the latest binary from the Release section on the right on GitHub.
- Create .env file and store personal bot token (use .env.example)
- You're now ready to run the bot!

# How to run on Windows
- Run tu-bot.cmd
- TU-Bot is now running!

# How to run on MacOSX
- Run tu-bot-mac.command
- TU-Bot is now running!

# How to contribute
Follow this project board to know the latest status of the project: [https://trello.com/tubot2]  

### JSDoc Design Documentation
- To generate JSDoc, on the command line run with
```
./node_modules/.bin/jsdoc index.js generateGroups.js channel.js help.js notification.js poll.js reminder.js roles.js
```
- To view JSDoc, on command line run with
```
./out/index.html
```


### How to build
- Use this github repository: https://github.com/cis3296s22/tu-bot
- Specify what branch to use
- Create .env file and store personal bot token (use .env.example)
- Use any JavaScript IDE (VSCode, WebStorm, etc.) to begin development!