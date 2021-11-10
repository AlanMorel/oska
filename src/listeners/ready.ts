import { SlashCommands } from "@/slashCommands/SlashCommands";
import { Logger } from "@/utils/Logger";
import { Client } from "discord.js";

export default (client: Client): void => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }
        await client.application.commands.set(SlashCommands);
        Logger.log(`${client.user.tag} is up and ready to go!`);
    });
};
