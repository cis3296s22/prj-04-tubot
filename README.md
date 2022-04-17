# TU-Bot
This is a practical implementation of a multi-purpose Discord bot with the intended use for professors and students to effectively communicate and use meaningful tools in the Discord application. With the hardest parts of quarantine behind us, many students and professors have created Discord accounts and Discord servers to communicate effectively with each other. In the online semesters, many students have picked up the platform and now use it in their everyday life for not just school – as Discord has created a social platform for students to create friendships and properly communicate and collaborate on schoolwork. TU Bot is a concept that strives to be used in all Temple University affiliated servers, with a large scope of helpful tools and commands that would be used for professors and students so that they can make the Discord platform even more convenient for them. Meaningful tools include things like appointment schedulers, academic reminders, categorized/organized notifications, group creators, collaboration toolkits etc. If development time allows it, the bot will strive to web-scrape Canvas for even more uses, perhaps with real-time notifications from Canvas.

# How to run   
- Download the latest binary from the Release section on the right on GitHub.  
- On the command line, access the release folder using
```
cd tu-bot  
```
- On the command line run with
```
node index.js
```
- TU Bot will give a confirmation of online status on the command line, and it will be ready to be used in your server!

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
- Use any JavaScript IDE (VSCode, WebStorm, etc.)
- Create .env file and store personal bot token (use .env.example)
- Run bot using 'node index.js' in command line to start bot.