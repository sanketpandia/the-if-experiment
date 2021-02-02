const fs = require('fs');
const { loadMasterConfigs } = require('./config_helper');

exports.getAircraftPerformance = async function(aircraftName){
    let aircraftData = await loadPerformanceFile();
    let aircrafts = Object.keys(aircraftData);
    let matchedAircraft = {"matched": false};
    for(let i = 0; i< aircrafts.length; i++){
        if(aircraftName.toUpperCase() === aircrafts[i].toUpperCase()){
            matchedAircraft['matched'] = true;
            matchedAircraft['result'] = aircraftData[aircrafts[i]];
        }
    }
    if(!matchedAircraft['matched']) matchedAircraft['result'] = aircrafts; 
    return matchedAircraft;
}

async function loadPerformanceFile(){
    return JSON.parse(fs.readFileSync('./assets_contents/aircraft_performances.json'));
}