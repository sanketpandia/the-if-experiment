const Discord = require('discord.js')

exports.createCmStatsMessage = async function (record, configFields, callsignField) {
    let dataFields = []
    configFields.forEach(element => {
        let data = record[element["airtableColumnName"]];
        let fieldValue = data;
        let inline_status = false;
        if("inline" in element && element["inline"] === "true") inline_status = true;
        if("type" in element && element["type"] === "array") {
            fieldValue = data.join(", ");
        }
        if ("type" in element && element["type"] === "time") {
            let time_left_str = (Math.floor(data / 3600)).toString() + ":"
            time_left_str += (Math.floor((data % 3600) / 60)).toString().length === 1 ? "0" + (Math.floor((data % 3600) / 60)).toString() : (Math.floor((data % 3600) / 60)).toString()
            fieldValue = time_left_str;
        }
        dataFields.push({
            name: element["name"],
            value: fieldValue,
            inline: inline_status
        })
    });

    var cmStatsResponse = new Discord.MessageEmbed()
        .setTitle(`Career Mode stats of  ${record[callsignField]}`)
        .addFields(dataFields)
        .setAuthor("TheAircraftExperimentBot")
    return cmStatsResponse;
}