"use strict"


module.exports = {
    name: "update",
    description: "Update the configs of the bot for the server",
    async execute(message){
        try{
           let guild = message.guild.fetch();
           console.log(guild);
           let channel = channels.find(channel => channel.name === "the-aircraft-experiment");
           channel.messages.fetch({ limit: 1 }).then(messages => {
            let lastMessage = messages.first();
            console.log(messages.first());
            
          })
          .catch(console.error);
          
           
        }catch(err){
            message.channel.send("Something went wrong. Contact dev")
            console.log(err)
        }
    }
}