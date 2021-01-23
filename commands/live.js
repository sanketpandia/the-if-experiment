"use strict"
const configUtils = require('../helper_services/config_helper')

module.exports = {
    name: "live",
    description: "Get the live flying stats of the VA members",
    async execute(message) {
        let guildId = message.guild.id;
        let guildData = await configUtils.loadGuildConfigs(guildId)
        if(guildData === {}){
            message.channel.send("The bot has not been configured properly in your server. \n**Contact admin and report this error. If unable to fix, contact sanketpandia on IFC**")
            return;
        }
    }
}