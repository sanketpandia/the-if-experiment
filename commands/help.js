"use strict"
const configUtils = require('../helper_services/config_helper')
const liveService = require('../helper_services/if_live_api_helper')
const messageCreator = require('../helper_services/message_creator');

module.exports = {
    name: "help",
    description: "Get the help message of the bot",
    async execute(message) {
      message.channel.send('This command does not exist. This message will be replaced by the help later. ');
      return;
    }
}