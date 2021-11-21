import { initializeCaches } from "@/Cache";
import Config from "@/Config";
import interactionCreate from "@/listeners/interactionCreate";
import messageCreate from "@/listeners/messageCreate";
import ready from "@/listeners/ready";
import { Client, Intents } from "discord.js";

initializeCaches();

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES
    ]
});

interactionCreate(client);
messageCreate(client);
ready(client);

client.login(Config.token);
