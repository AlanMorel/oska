import { SlashCommand } from "@/slashCommands/SlashCommand";
import { BaseCommandInteraction, Client, MessageEmbed } from "discord.js";

export const Ping: SlashCommand = {
    name: "ping",
    description: "Returns websocket ping",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const pembed = new MessageEmbed()
            .setColor("#2F3136")
            .setTitle("Client Ping")
            .addField("**Latency**", `\`${Date.now() - interaction.createdTimestamp}ms\``)
            .addField("**API Latency**", `\`${Math.round(client.ws.ping)}ms\``)
            .setTimestamp()
            .setFooter(`${interaction.user.username}`, interaction.user.avatarURL() ?? undefined);

        await interaction.followUp({
            content: `${client.ws.ping}ms!`,
            embeds: [pembed]
        });
    }
};
