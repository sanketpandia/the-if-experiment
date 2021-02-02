const Airtable = require('airtable');

exports.fetchCareerModeLogs = async function(airtableConfigs){
    var base = new Airtable({apiKey: airtableConfigs["api_key"]}).base(airtableConfigs["base_id"])
    var airtableData = [];
    await base(airtableConfigs["table_name"]).select().all().then(data => {
        data.forEach(element => {
            airtableData.push(element['fields'])
        });
    }).catch(err => {
        console.log(err);
    })
    
    return airtableData;
}