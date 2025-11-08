import { Application, Client, Events, GatewayIntentBits } from "discord.js";

const TOKEN = process.env.TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    const channel = readyClient.channels.cache.get('1136134897837277204');
    channel.send("Testing 123")

});

client.login(TOKEN);

