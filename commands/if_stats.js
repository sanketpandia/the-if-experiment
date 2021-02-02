"use strict"
const ifHelper = require('../helper_services/if_live_api_helper');
const message_creator = require('../helper_services/message_creator');

module.exports = {
    name: "if_stats",
    description: "Gets stats of the user from IF",
    async execute(message) {
        let splitMessage = message.content.split(' ',2);
        if (splitMessage.length < 2) {
            message.channel.send('**Please mention a user you want to get the stats for. Username should be the IFC name. **')
            return
        }
        else {
            let userInfo = await ifHelper.getUserStats(process.env.IF_API_KEY, splitMessage[1].toUpperCase());
            //console.log(userInfo);
            if(Object.keys(userInfo).length === 0 && userInfo.constructor === Object){
                console.log('User data not found');
                message.channel.send('Could not find the username in IF. Check again to make sure the name is proper');
                return;
            }
            let responseMessage = await message_creator.createUserMessage(userInfo);
            message.channel.send(responseMessage)
        }
    }
}