"use strict"
const configUtils = require('../helper_services/config_helper');


module.exports = {
    name: "learn",
    description: "Link learning materials for user",
    async execute(message) {
        let guildId = message.guild.id;
        let guildData = await configUtils.loadGuildConfigs(guildId)
        let splitMessage = message.content.split(' ');
        let queryLink = '';
        if (splitMessage.length < 2) queryLink = ' ';
        else {
            splitMessage.shift()
            queryLink = splitMessage.join(' ');
        }
        if(!('learn' in guildData)){
            message.channel.send('Learning materials have not been configured in your server. Contact admin. ');
            return;
        }
        let links = Object.keys(guildData['learn'])
        for(let i = 0; i < links.length; i++){
            if(links[i].toUpperCase() === queryLink.toUpperCase()){
                message.author.send('```Here is the link for the '+ links[i]+' document you asked for: \n```\n' + guildData['learn'][links[i]]);
                message.channel.send('```I have DMed you the document link. Here are other keywords you can checkout: ' + links.join(', ')  + '\n```');
                return;
            }
        }
        message.channel.send('```Sorry I could not find the document. Here are other keywords you can checkout: ' + links.join(', ')  + '\n```');
    }
}