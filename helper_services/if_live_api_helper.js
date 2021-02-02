const masterConfigs = require('./config_helper');
const axios = require('axios');

async function getSession(ifApiKey, configs) {
    const session = await axios.get(`${configs["IF_API_URL"]}/sessions?apikey=${ifApiKey}`);
    let expertServerObj = {};
    if (session.data.errorCode !== 0) return expertServerObj;
    session.data.result.forEach(element => {
        if (element.name === 'Expert Server') expertServerObj = element;
    });
    return expertServerObj;
}

exports.getFlights = async function (ifApiKey, guildConfigs) {
    let configs = await masterConfigs.loadMasterConfigs();
    let sessionId = await getSession(ifApiKey, configs);
    let callsignPattern = guildConfigs['callsign_patterns']['if_callsign'];
    callsignPattern = ('.*' + callsignPattern + '.*').replace('xxx', '\\d\\d\\d');
    var rxPattern = new RegExp(callsignPattern);
    let vaFlights = await getAllFlights(sessionId['id'], configs['IF_API_URL'], ifApiKey, rxPattern);
    for (let i = 0; i < vaFlights.length; i++) vaFlights[i]['route'] = await getFlightPlan(configs['IF_API_URL'], ifApiKey, vaFlights[i]['flightId']);
    vaFlights = await getAllFlightPlans(configs['IF_API_URL'], ifApiKey, sessionId['id'], vaFlights);
    return vaFlights;
}

async function getAllFlights(sessionId, ifApiUrl, ifApiKey, callsignPattern) {
    let filteredFlights = [];
    let allFlights = await axios.get(`${ifApiUrl}/flights/${sessionId}?apikey=${ifApiKey}`);
    console.log(`${ifApiUrl}/flights/${sessionId}?apikey=${ifApiKey}`);
    allFlights.data['result'].forEach(element => {
        if (callsignPattern.test(element['callsign'])) filteredFlights.push(element);
    })
    return filteredFlights;
}

async function getFlightPlan(ifApiUrl, ifApiKey, flightId) {
    let responseMessage = [];
    await axios.get(`${ifApiUrl}/flight/${flightId}/flightplan?apikey=${ifApiKey}`).then(res => {
        if (res.data.errorCode !== 0) return responseMessage;
        else {
            responseMessage.push(res.data.result.flightPlanItems[0]['name']);
            responseMessage.push(res.data.result.flightPlanItems[res.data.result.flightPlanItems.length - 1]['name']);
        }
    }).catch(err => {});

    return responseMessage;
}

async function getAllFlightPlans(ifApiUrl, ifApiKey, sessionId, vaFLights){
    let aircraft_datastore = await masterConfigs.readAircraftDatastore();
    let responseObj = []
    let flightPlans = await axios.get(`${ifApiUrl}/flightplans/${sessionId}?apikey=${ifApiKey}`)
    for(let i = 0; i < vaFLights.length; i++){
        let route = 'No FPL Found';
        let livery = '';
        let aircraft = '';
        let username = (vaFLights[i]['username'] === null)? "IFC Not linked" : vaFLights[i]['username'];

        for(let j = 0; j < flightPlans.data.result.length; j++){
            if(vaFLights[i]['flightId'] === flightPlans.data.result[j]['flightId']){
                if(flightPlans.data.result[j].waypoints.length === 0) break;
                route = flightPlans.data.result[j].waypoints[0] + '-' + flightPlans.data.result[j].waypoints[flightPlans.data.result[j].waypoints.length - 1]
            }
        }
        for(let j = 0; j < aircraft_datastore.length; j++){
            if(aircraft_datastore[j]['AircraftId'] === vaFLights[i]['aircraftId'] && aircraft_datastore[j]['LiveryId'] === vaFLights[i]['liveryId']){
                aircraft = aircraft_datastore[j]['AircraftName'];
                livery = aircraft_datastore[j]['LiveryName'];
            }
        }
        responseObj.push({
            username: username,
            callsign: vaFLights[i]['callsign'],
            altitude:( (Math.round(vaFLights[i]['altitude']/100))*100).toString()+'ft',
            gs: (Math.round(vaFLights[i]['speed'])).toString() + 'kts',
            aircraft: aircraft,
            livery: livery,
            route: route
        })
        
    }
    return responseObj;
}