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

const botStats = { // Change the ID's to your channel ID's
    totalGuildsID: '524809024282296342',
    totalUsersID: '524751843960684544',
    totalChannelsID: '524809068007784448'
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

client.on('guildCreate', guild => {

    client.channels.get(botStats.totalGuildsID).setName(`Total Guilds : ${client.guilds.size}`);
    client.channels.get(botStats.totalUsersID).setName(`Total Users : ${client.guilds.reduce((a, g) => a + g.memberCount)}`);
    client.channels.get(botStats.totalChannelsID).setName(`Total Channels : ${client.channels.size}`);

});

client.on('guildDelete', guild => {

    client.channels.get(botStats.totalGuildsID).setName(`Total Guilds : ${client.guilds.size}`);
    client.channels.get(botStats.totalUsersID).setName(`Total Users : ${client.guilds.reduce((a, g) => a + g.memberCount)}`);
    client.channels.get(botStats.totalChannelsID).setName(`Total Channels : ${client.channels.size}`);

});

// Login to Discord
client.login(tokenfile.TOKEN);