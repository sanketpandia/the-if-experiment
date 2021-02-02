const fs = require('fs');

exports.writeGuildConfigs = async function(guildId, text){
    let fileContents = JSON.parse(fs.readFileSync("./configs/cached_configs.json"));
    fileContents[guildId] = JSON.parse(text);
    fs.writeFileSync("./configs/cached_configs.json", JSON.stringify(fileContents));
}

exports.loadGuildConfigs = async function(guildId){
    let fileContents = JSON.parse(fs.readFileSync('./configs/cached_configs.json'));
    let response = guildId in fileContents ? fileContents[guildId] : {};
    return response;
}

exports.loadMasterConfigs = async function(){
    return JSON.parse(fs.readFileSync('./configs/master_configs.json'));
}

exports.writeAircraftDatastore = async function(data){
    fs.writeFileSync("./assets_contents/aircraft_datastore.json", JSON.stringify(data));
}
exports.readAircraftDatastore = async function(data){
    let fileContents = JSON.parse(fs.readFileSync('./assets_contents/aircraft_datastore.json'));
    return fileContents;
}

exports.getChecklistFiles = async function(){
    return fs.readdirSync('./assets_contents/checklists');
}