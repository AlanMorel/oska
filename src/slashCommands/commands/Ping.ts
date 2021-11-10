import { SlashCommand } from "@/slashCommands/SlashCommand";
import { BaseCommandInteraction, Client } from "discord.js";

export const Ping: SlashCommand = {
    name: "ping",
    description: "Returns websocket ping",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction, args: string[]) => {
        await interaction.followUp({
            content: `${client.ws.ping}ms!`
        });
    }
};
