const fs = require('../helper_services/config_helper');

module.exports = {
    name: "bot_stats",
    description: "Fetches the Guild where the bot is installed",
    async execute(message) {
        message.channel.send("Bot is being used in the following guilds")
        let data = await fs.readGuilds()
        message.channel.send(data);
    }
}