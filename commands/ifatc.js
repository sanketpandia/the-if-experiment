"use strict"
const ifHelper = require('../helper_services/if_live_api_helper');
const masterConfigs = require('../helper_services/config_helper');
let messageCreator = require('../helper_services/message_creator');

module.exports = {
    name: "ifatc",
    description: "Get the active IFATC regions in the expert server",
    async execute(message) {
      //    message.channel.send('This command does not exist. This message will be replaced by the help later. ');
      let configs = await masterConfigs.loadMasterConfigs();
      let atc = await ifHelper.getATC(process.env.IF_API_KEY, configs);
      let atcResponse = await messageCreator.createATCMessage(atc);
      message.channel.send(atcResponse);
      return;
    }
}