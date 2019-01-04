// Packages Needed
const Discord = require('discord.js');
const client = new Discord.Client()
let tokenfile = require('./token.json');

// Variables
const prefix = '=';
const ownerID = '206587228200239104';

const serverStats = { // Change the ID's to your channel ID's
    guildID: '483125172715520001',
    totalUsersID: '524749140974895106',
    memberCountID: '524749183077318656',
    botCountID: '524749224290549791'
};

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

client.on('guildMemberAdd', member => {

    if (member.guild.id !== serverStats.guildID) return;

    client.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`);
    client.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.members.filter(m => !m.user.bot).size}`);
    client.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`);

});

client.on('guildMemberRemove', member => {

    if (member.guild.id !== serverStats.guildID) return;

    client.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`);
    client.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.members.filter(m => !m.user.bot).size}`);
    client.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`);

});

// Login to Discord
client.login(tokenfile.TOKEN);