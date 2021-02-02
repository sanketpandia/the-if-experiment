"use strict"
const ifHelper = require('../helper_services/if_live_api_helper');
const message_creator = require('../helper_services/message_creator');

module.exports = {
    name: "atis",
    description: "Gets ATIS info",
    async execute(message) {
        let splitMessage = message.content.split(' ',2);
        if (splitMessage.length < 2) {
            message.channel.send('**Please mention an airport you want to get the D-ATIS for. You may use >ifatc for active frequencies. **')
            return
        }
        else {
            let ATISInfo = await ifHelper.getATIS(splitMessage[1].toUpperCase());
            if(ATISInfo === ""){
                message.channel.send('Airport does not seem to be active right now. Check >ifatc for active airports.');
                return;
            }
            let responseMessage = await message_creator.createATIS(ATISInfo);
            message.channel.send(responseMessage)
        }
    }
}