// Packages Needed
const Discord = require('discord.js');
const client = new Discord.Client()
let tokenfile = require('./token.json');

// Variables
const prefix = '=';
const ownerID = '206587228200239104';

// Listener Events
client.on('message', message => {

    // Variables
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    // Return Statements
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    // Command Handler
    try {

        // Options
        let ops = {
            ownerID: ownerID
        }
        
        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args, ops);

    } catch (e) {
        console.log(e.stack)
    }

});

client.on('ready', () => console.log('Launched'));

// Login to Discord
client.login(tokenfile.TOKEN);