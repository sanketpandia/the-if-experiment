"use strict"
const configUtils = require('../helper_services/config_helper')
const utils = require('../helper_services/utils');

module.exports = {
    name: "update",
    description: "Update the configs of the bot for the server",
    async execute(message) {
        try {

            let guildId = message.guild.id;
            let channels = await message.guild.channels.cache;
            let configChannel;
            channels.forEach(element => {
                if (element.name === "the-aircraft-experiment") {
                    configChannel = element;
                }
            });
            //let channel = channels.find(channel => channel.name === "the-aircraft-experiment");
            let lastMessage;
            var configs = [];
            var messageContents = [];
            await configChannel.messages.fetch({ limit: 3 }).then(messages => {
                lastMessage = messages.first().content;
                messages.forEach(msg => messageContents.push(msg.content))
            }).catch(console.error);
            var guildConfig = {};
            for(const msg of messageContents){
                var res = await utils.validateJson(msg)
                if(res){
                    configs.push(msg)
                    var obj = JSON.parse(msg);
                    var keys = Object.keys(obj);
                    for(const key of keys){
                        guildConfig[key] = obj[key];
                    }
                }
            }
            
            
            configUtils.writeGuildConfigs(guildId, JSON.stringify(guildConfig))
            message.channel.send(`Updated configs from ${configs.length} messages successfully! :cheers:`)

        } catch (err) {
            message.channel.send("Updating configs failed.\nMake sure #the-aircraft-experiment is clear of other messages and only has the config messages and you are using this command in a different channel.\n Make sure to read the docs properly and use the proper pattern.\nIf it fails contact sanketpandia on IFC.")
            console.log(err)
        }
    }
}