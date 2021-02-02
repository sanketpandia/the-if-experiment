The IF Experiment

## Table of contents
* [Commands](#Commands)
* [Installation](#Installation)
* [Configure](#Configure)

## Commands
## pilot_stats: 
- Fetches the stats of the pilot from the airtable database. Needs to be configured properly. Check docs for configuration
- Pilot needs to have the callsign in their discord display name and pattern should be conigured in the bot configs
- Usage syntax: `>pilot_stats`

## cm_stats:
- Fetches the career mode stats of the pilot from the airtable. Needs to be configured properly. Check docs for configuration
- Usage syntax: `>cm_stats`
- Pilot needs to have the callsign in their discord display name and pattern should be conigured in the bot configs

## live:
- Fetches the live flights of the VA. The callsign pattern needs to be configured in the configurations
- live_small command not updated yet. To be done
- Usage syntax: `>live`
- Usage syntax: `>live_small`

## aircraft:
- Fetches the aircraft performances of different aircrafts. The repository can be updated. Images can also be added to the repository later to fetch the flight data.
- Usage syntax: `>aircraft A318-100`

## ifatc:
- Fetches the active IFATC regions in the expert server.
- Usage syntax: `>ifatc`

## link and learn: 
- Fetches the relevant docs as marked by the server admin
- Usage syntax: `>learn keyword`
- Usage syntax: `>link keyword`


## if_stats
- Usage syntax `>if_stats Cameron`
- Fetches the in game stats of the user

## atis
- Usage syntax `>atis EGLL`
- Fetches the ATIS information of Active Airports in the Expert Server

## prep_my_flight
- Usage syntax `>prep_my_flight`
- Fetches the checklists of the aircraft you are currently flying.
- Need to be in VA discord with the callsign patterns configured.

## Installation

- Click [here](https://discord.com/api/oauth2/authorize?client_id=802526146058911765&permissions=121856&scope=bot) to install the bot in your server

## Configure


- Head over to https://github.com/sanketpandia/the-if-experiment/blob/main/example_config.json and copy the contents of the file
- In your discord server, create a channel (preferably Private) by the name of 'the-aircraft-experiment', and allow the bot access to the channel
- Open a notepad or any other text editor in your PC.
- Paste the contents that you copied from the link above.
### Do not change the left side text (i.e. text before the column).
- In callsign patterns replace the following:
    - Switch the value in if_callsign to the format of your VA. For example, if you are BAVA, switch it to
            "if_callsign": "Speedbird xxxVA"
        If you are from AFKLM, switch it to:
            "if_callsign": "xxxAK"
        When searching for pilots from your VA, the xxx will be substituted to their corresponding callsign numbers. So let them be
    
    - Switch the value in discord_callsign to the format you use in your server. For example if the display name format in your discord server is `Cameron (MHVA010)`, then the value should look like `"discord_callsign" : "BAVAxxx"` .  When you have done this, it will know what your current flight callsign looks like and will be able to facilitate the use of multiple commands

- There are two more fields called `"link"` and `"learn"`: Inside these you can place multiple keywords and texts to correspond them. For example if you cc link is `https://community.infiniteflight.com/`, your data would look like this,
    {
        "link": {
            "cc" : "https://community.infiniteflight.com/"
        }
    }.
    You can add any number of links and document links. So after you are done, your text should look like this now:
    ```
    {
    "callsign_patterns": {
        "if_callsign": "Speedbird xxxVA",
        "discord_callsign": "BAVAxxx"
    },
    "learn": {
        "ifc": "https://community.infiniteflight.com",
        "if": "https://infiniteflight.com"
    },
    "link": {
        "ifatc": "https://ifatc.org",
        "cc": "https://infiniteflight.com"
    }
    }
    ```

 - Validate your text in `https://jsonlint.com/`. Copy the text and paste it in the text box there and click on 'Validate JSON'. 
 - If it says 'VALID JSON' in the results, then copy the text to the newly created channel (#the-aircraft-experiment) and paste it there
 - go to a public channel now and run the command '>update'. You should get a reply 'Configs updated successfully'.
## Now you may try out all the commands in the list. You won't be able to use cm_stats and pilot_stats. You should be good to go. 

