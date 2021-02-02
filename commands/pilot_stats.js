"use strict"
const configUtils = require('../helper_services/config_helper');
const careerHelper = require('../helper_services/career_airtable_helper');
const utils = require('../helper_services/utils');
const messageCreator = require('../helper_services/message_creator');

module.exports = {
    name: "pilot_stats",
    description: "Loads the CM data",
    async execute(message) {
        let guildId = message.guild.id;
        let guildData = await configUtils.loadGuildConfigs(guildId)
        if(guildData === {}){
            message.channel.send("The bot has not been configured properly in your server. \n**Contact admin and report this error. If unable to fix, contact sanketpandia on IFC**")
            return;
        }
        if(!("pilot_stats_airtable_connection" in guildData)){
            message.channel.send("I am sorry! Your server's career mode airtable connection is not available.\n**Contact your server admin regarding this error**")
            return;
        }
        if(!("callsign_patterns" in guildData) || !("discord_callsign" in guildData["callsign_patterns"])){
            message.channel.send("The callsign patterns of your server seem to be messed up. Contact admin.");
            return;
        }
        if(!("callsign_prefix_airtable" in guildData["callsign_patterns"])){
            message.channel.send("The **callsign_prefix_airtable** field seems to be missing in your config. Contact admin.");
            return;
        }
        if(!("callsign_column_name" in guildData["pilot_stats_airtable_connection"])){
            message.channel.send("Your career mode airtable config is out of order. Keys are missing");
            return;
        }
        let careerModeData = await careerHelper.fetchCareerModeLogs(guildData["pilot_stats_airtable_connection"]);
        if(careerModeData === []){
            message.channel.send("Unable to fetch data from airtable");
            return;
        }
        let callsign = await utils.getCallSign(message, guildData["callsign_patterns"]["discord_callsign"], guildData["callsign_patterns"]["callsign_prefix_airtable"]);
        if(callsign === ""){
            message.channel.send("Your callsign couldn't be extracted from your Discord Display Name! Make sure the pattern is correct");
            return;
        }
        let record = await utils.filterRecordByCallsign(careerModeData,guildData["pilot_stats_airtable_connection"]["callsign_column_name"], callsign);
        if(record === {}){
            message.channel.send("Sorry your record could not be found in airtable!!");
            return;
        }
        let responseMessage = await messageCreator.createCmStatsMessage(record, guildData["pilot_stats_airtable_connection"]["fields"],guildData["pilot_stats_airtable_connection"]["callsign_column_name"])
        message.channel.send(responseMessage);
    }

    
}