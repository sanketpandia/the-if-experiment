"use strict"
const utils = require('../helper_services/utils');

module.exports = {
    name: "update_aircraft_database",
    description: "Updates the aircraft database. Required after IF data store update",
    async execute(message) {
        await utils.updateAircraftsDatastore();
        message.channel.send("The datastore was updated successfully");
    }
}