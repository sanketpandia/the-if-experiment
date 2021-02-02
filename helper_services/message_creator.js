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

exports.createLiveMessage = async function(responseObj){

    let responseMessages = []
    let responseMessage = '```'; 
    for (let i =0; i < responseObj.length; i++){
        if(responseMessage.length > 1700){
            responseMessages.push(responseMessage + '\n```');
            responseMessage = '```';
        }
        responseMessage += `
        Callsign: ${responseObj[i]['callsign']}
        IFC Username: ${responseObj[i]['username']}
        Aircraft: ${responseObj[i]['aircraft']}
        Livery: ${responseObj[i]['livery']}
        Altitude: ${responseObj[i]['altitude']}
        Ground Speed: ${responseObj[i]['gs']}
        Route: ${responseObj[i]['route']}

        `
    }
    responseMessages.push(responseMessage+ '\n```');


    return responseMessages;
}

exports.createLiveMiniMessage = async function(responseObj){

    let responseMessages = []
    let responseMessage = '```'; 
    for (let i =0; i < responseObj.length; i++){
        if(responseMessage.length > 1700){
            responseMessages.push(responseMessage + '\n```');
            responseMessage = '```';
        }
        responseMessage += `
        Callsign: ${responseObj[i]['callsign']}
        IFC Username: ${responseObj[i]['username']}
        Aircraft: ${responseObj[i]['aircraft']}
        Livery: ${responseObj[i]['livery']}
        Altitude: ${responseObj[i]['altitude']}
        Ground Speed: ${responseObj[i]['gs']}
        Route: ${responseObj[i]['route']}

        `
    }
    responseMessages.push(responseMessage+ '\n```');


    return responseMessages;
}

exports.createAircraftPerformanceMessage = async function(matchedAircraft){
    //console.log(matchedAircraft);
    if(matchedAircraft['matched']){
        var aircraftResponse = new Discord.MessageEmbed()
        .setTitle(`Aircraft Performance Spec of ${matchedAircraft['result']['Airplane']}`)
        .addFields(
            {name: 'MTOW', value: matchedAircraft['result']["MTOW"], inline: true},
            {name: 'MLW', value: matchedAircraft['result']["MLW"], inline: true}
        )
        .addField('Range', matchedAircraft['result']["Typical Range"],true)
        .addField('Service Ceiling', matchedAircraft['result']["Ceiling"],true)
        .addFields(
            {name: 'Climb To 5000ft', value: matchedAircraft['result']["Climb to 5000ft"], inline:true},
            {name: 'Climb To 15000ft', value: matchedAircraft['result']["Climb to 15000ft"], inline:true},
            {name: 'Climb To 24000ft', value: matchedAircraft['result']["Climb to 24000ft"], inline:true},
            {name: 'Mach Climb', value: matchedAircraft['result']["Mach Climb"], inline:true},
            {name: 'Cruise Speed', value: matchedAircraft['result']["Cruise Speed"], inline:true},
            {name: 'Descent to 24000ft', value: matchedAircraft['result']["Descend to 24000ft"], inline:true},
            {name: 'Descent to 10000ft', value: matchedAircraft['result']["Descend to 10000ft"], inline:true},
            {name: 'Approach / MCS speed', value: matchedAircraft['result']["Approach / MCS"], inline:true},
            {name: 'Landing speed', value: matchedAircraft['result']["Landing"], inline:true},
            {name: 'Flap Speeds', value: matchedAircraft['result']["Flaps at descend"]})

    }else{
        var aircraftResponse = '```\nApologies! I was not able to find the aircraft you specified. You may try one from this list: \n';
        let leftBase = true;
        var spaceChar = ' ';
        //console.log(matchedAircraft['result']);
        for(let i = 0; i< matchedAircraft['result'].length; i++){
            if(leftBase){
                aircraftResponse += (matchedAircraft['result'][i] + spaceChar.repeat(50-matchedAircraft['result'][i].length));
                leftBase = false
            }else{
                aircraftResponse += matchedAircraft['result'][i] + '\n';
                leftBase = true;
            }
            
        }
        aircraftResponse += '\n```';

    }
   
return aircraftResponse;
}