"use strict"
const configUtils = require('../helper_services/config_helper')
const ifHelper = require('../helper_services/if_live_api_helper')
const messageCreator = require('../helper_services/message_creator');
const utils = require('../helper_services/utils');

module.exports = {
    name: "prep_my_flight",
    description: "Get the checklists of your current VA flight",
    async execute(message) {
        let guildId = message.guild.id;
        let guildData = await configUtils.loadGuildConfigs(guildId);
        if(!("callsign_patterns" in guildData) || !("discord_callsign" in guildData["callsign_patterns"])){
            message.channel.send("The callsign patterns of your server seem to be messed up. Contact admin.");
            return;
        }
        let callsignPattern = await utils.getLiveCallsign(message, guildData["callsign_patterns"]["discord_callsign"], guildData["callsign_patterns"]["if_callsign"]);
        let userFlight = await ifHelper.getUserFlight(process.env.IF_API_KEY, callsignPattern);
        
        let checklists = await configUtils.getChecklistFiles();
        let acceptedFiles = []
        for(let i = 0; i < checklists.length; i++){
            if(checklists[i].startsWith(userFlight)) acceptedFiles.push('./assets_contents/checklists/'+checklists[i]);
        }
        if(acceptedFiles.length === 0){
            message.channel.send(`Sorry I don't have the checklists for **${userFlight}**.`);
            return;
        }
        message.channel.send(`I have DMed you the checklists for ${userFlight}. `);
        message.author.send("Here are your checklists", {files: acceptedFiles})
    }
}