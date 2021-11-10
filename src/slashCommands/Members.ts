import { SlashCommand } from "@/slashCommands/SlashCommand";
import { Logger } from "@/utils/Logger";
import { BaseCommandInteraction, Client } from "discord.js";

export const Members: SlashCommand = {
    name: "members",
    description: "Returns server members info",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction, args: string[]) => {
        const guild = interaction.guild;
        if (!guild || !client) {
            Logger.log("No valid guild found!");
            return;
        }

        const members = await guild.members.fetch();
        members.forEach(member => {
            console.log(member);
        });

        await interaction.followUp({
            content: `Server name: ${guild.name}`
        });
    }
};
