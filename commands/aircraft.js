"use strict"
const helper = require('../helper_services/static_helper');
const messageHelper = require('../helper_services/message_creator');

module.exports = {
    name: "aircraft",
    description: "Fetches the Aircraft Performance of aircrafts in IF",
    async execute(message) {
      //message.channel.send('This command does not exist. This message will be replaced by the help later. ');
      let splitMessage = message.content.split(' ');
      let matchedAircraft = {}
      let queryAircraft = '';
      if(splitMessage.length < 2) queryAircraft = ' ';
      else queryAircraft = splitMessage[1];
      matchedAircraft = await helper.getAircraftPerformance(queryAircraft);
      let responseMessage = await messageHelper.createAircraftPerformanceMessage(matchedAircraft);
      message.channel.send(responseMessage);
    }
}