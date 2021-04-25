'use strict';

//config loads
require('dotenv').config({path: './.env'})
const fs = require('fs')

//discord load
const Discord = require('discord.js');
const client = new Discord.Client();

//Load discord commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//Load bot configs
let rawConfig = fs.readFileSync('./configs/master_configs.json')
let botConfigs = JSON.parse(rawConfig)

let botPrefix = botConfigs.botPrefix

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    const Guilds = client.guilds.cache.map(guild => guild.name);
    fs.writeFileSync("./assets_contents/logs.txt", Guilds.join(','));
    try {
        let toSay = "The bot has been updated. The callsign pattern config has been changed. So instead of using Speedbird xxxVA which was being done previously, switch it to Speedbird ^^^VA. Sorry for the inconvenience "
        client.guilds.cache.map((guild) => {
          let found = 0
          guild.channels.cache.map((c) => {
            if (found === 0) {
              if (c.type === "text") {
                if (c.permissionsFor(client.user).has("VIEW_CHANNEL") === true) {
                  if (c.permissionsFor(client.user).has("SEND_MESSAGES") === true) {
                    c.send(toSay);
                    found = 1;
                  }
                }
              }
            }
          });
        });
      }
      catch (err) {
        console.log("Could not send message to a (few) guild(s)!");
      }
})

client.on('message', message => {
    //check to see if the message author is a bot or not
    if(message.author.bot) return;
    
    //Part below only looks for specific command
    if(!message.content.startsWith(botPrefix)) return;

    const args = message.content.slice(botPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    if (!client.commands.has(commandName)) {
        client.commands.get('help').execute(message);
        return
    }
    const command = client.commands.get(commandName);
    
    

    try {
        client.commands.get(commandName).execute(message);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
    //for the aircraft specifications command
    // if(message.content.startsWith(botPrefix +  botConfigs.commands.ReturnAircraftSpecificationsCommand)){
    //     try{
    //         message.channel.send(middleware.loadAircraftSpecs(message.content))
    //     }catch(err){
    //         message.channel.send("Something went wrong. Contact dev")
    //         console.log(err)
    //     }
    // }

})

client.login(process.env.BOT_ID)