import Config from "@/Config";
import interactionCreate from "@/listeners/interactionCreate";
import messageCreate from "@/listeners/messageCreate";
import ready from "@/listeners/ready";
import { Client, Intents } from "discord.js";

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

interactionCreate(client);
messageCreate(client);
ready(client);

client.login(Config.token);
