The IF Experiment

## ***Commands ***
## pilot_stats: 
- Fetches the stats of the pilot from the airtable database. Needs to be configured properly. Check docs for configuration

## cm_stats:
- Fetches the career mode stats of the pilot from the airtable. Needs to be configured properly. Check docs for configuration

## live:
- Fetches the live flights of the VA. The callsign pattern needs to be configured in the configurations
- live_small command not updated yet. To be done

## aircraft performances:
- Fetches the aircraft performances of different aircrafts. The repository can be updated. Images can also be added to the repository later to fetch the flight data.


## ***Required VA related Configs***
## Regex Pattern: 
- To fetch callsign from Discord display name
- To recognise callsign in IF live api
Airtable:
## **Pilot Stats**: 
- Airtable base id
- Airtable token
- Airtable table name
- fields to be displayed (Array of objects)
- Callsign column name
## **Career mode stats:**
- Airtable base id
- Airtable table name
- Airtable token
- Fields to be displayed (Array of objects)
- Callsign column name

## Bot master configs:
- Discord Bot Id
- IF Live API token