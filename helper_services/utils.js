const configsService = require('./config_helper');
const csvtojsonV2 = require("csvtojson");

exports.getCallSign = async function getCallsign(message, pattern, callsignPrefix){
    var value = ""
    pattern = pattern.replace("xxx", "(\\d\\d\\d)");
    var rxPattern = new RegExp(pattern);
    //console.log(rxPattern);
    await message.guild.members.fetch(message.author.id).then(data => {
        var arr = rxPattern.exec(data.displayName);
        var x= callsignPrefix + arr[1];
        value = x;
    }).catch(console.log)
    return value
}

exports.filterRecordByCallsign = async function(records, callsignField, callsign){
    callsign = callsign.replace(' ', '').toUpperCase().normalize();
    let returnObj = {}
    await records.forEach(element => {
        //console.log(element);
        let callsign_i = element[callsignField];
        callsign_i = callsign_i.replace(' ', '').toUpperCase().normalize();
        //console.log(callsign, callsign_i, callsign === callsign_i);
        //console.log(callsign_i.length.toString() + callsign_i + ": " + callsign.length.toString() + callsign);
        if(callsign === callsign_i) {
            returnObj = element;
        }
    });
    return returnObj;
}

exports.updateAircraftsDatastore = async function(){
    let configs = await configsService.loadMasterConfigs();
    let aircraftData = []
    for(let i =0; i < configs["IF_FLIGHT_DATA_FILES"].length; i++){
        aircraftData.push(await loadCSV('./assets_contents/'+configs["IF_FLIGHT_DATA_FILES"][i]))
    }
    let finalObj = []
    for(let i =0; i < aircraftData.length; i++){
        for(let j = 0; j< aircraftData[i].length; j++)finalObj.push(aircraftData[i][j]);
    }
    configsService.writeAircraftDatastore(finalObj);
    return 0;
}
async function loadCSV(filename){
    let aircraftData = [];
    await csvtojsonV2()
    .fromFile(filename)
    .then(jsonObj => {
        aircraftData = jsonObj;
    });
    return aircraftData
}
exports.getLiveCallsign = async function(message, discordPattern, ifPattern){
    var value = ""
    let pattern = discordPattern.replace("xxx", "(\\d\\d\\d)");
    var rxPattern = new RegExp(pattern);
    //console.log(rxPattern);
    await message.guild.members.fetch(message.author.id).then(data => {
        var arr = rxPattern.exec(data.displayName);
        var x= ifPattern.replace('xxx', arr[1]);
        value = x;
    }).catch(console.log);
    return value
}