import { SlashCommand } from "@/slashCommands/SlashCommand";
import { ApplicationCommandType, Client, CommandInteraction, EmbedBuilder } from "discord.js";

export const Ping: SlashCommand = {
    name: "ping",
    description: "Returns websocket ping",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const pembed = new EmbedBuilder()
            .setColor("#2F3136")
            .setTitle("Client Ping")
            .addFields([
                {
                    name: "**Latency**",
                    value: `\`${Date.now() - interaction.createdTimestamp}ms\``,
                    inline: true
                },
                {
                    name: "**API Latency**",
                    value: `\`${Math.round(client.ws.ping)}ms\``,
                    inline: true
                }
            ])
            .setTimestamp()
            .setFooter({
                text: `${interaction.user.username}`,
                iconURL: interaction.user.avatarURL() ?? undefined
            });

        await interaction.followUp({
            content: `${client.ws.ping}ms!`,
            embeds: [pembed],
            ephemeral: true
        });
    }
};
