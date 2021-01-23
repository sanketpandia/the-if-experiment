"use strict"
const configUtils = require('../helper_services/config_helper')

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
            await configChannel.messages.fetch({ limit: 1 }).then(messages => {
                lastMessage = messages.first().content;

            }).catch(console.error);
            JSON.parse(lastMessage);
            configUtils.writeGuildConfigs(guildId, lastMessage)
            message.channel.send("Configs updated successfully. Have fun!!")

        } catch (err) {
            message.channel.send("Updating configs failed. Make sure to read the docs properly and use the proper pattern.\nIf it fails contact sanketpandia on IFC.")
            console.log(err)
        }
    }
}