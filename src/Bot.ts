import { initializeCaches } from "@/Cache";
import Config from "@/Config";
import interactionCreate from "@/listeners/interactionCreate";
import messageCreate from "@/listeners/messageCreate";
import ready from "@/listeners/ready";
import { Client, GatewayIntentBits } from "discord.js";

initializeCaches();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ]
});

interactionCreate(client);
messageCreate(client);
ready(client);

client.login(Config.token);
