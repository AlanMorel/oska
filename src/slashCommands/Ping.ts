import { SlashCommand } from "@/slashCommands/SlashCommand";
import { BaseCommandInteraction, Client } from "discord.js";

export const Ping: SlashCommand = {
    name: "ping",
    description: "returns websocket ping 3?",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction, args: string[]) => {
        await interaction.followUp({ content: `${client.ws.ping}ms!` });
    }
};
