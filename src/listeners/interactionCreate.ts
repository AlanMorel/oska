import { SlashCommands } from "@/slashCommands/SlashCommands";
import { BaseCommandInteraction, Client, Interaction } from "discord.js";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand()) {
            await handleSlashCommands(client, interaction);
        } else if (interaction.isContextMenu()) {
            await handleContextMenu(client, interaction);
        }
    });
};

const handleSlashCommands = async (client: Client, interaction: BaseCommandInteraction): Promise<void> => {
    await interaction.deferReply({
        ephemeral: false
    });

    const slashCommand = SlashCommands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: "An error has occured" });
        return;
    }

    const args: string[] = [];

    slashCommand.run(client, interaction, args);
};

const handleContextMenu = async (client: Client, interaction: BaseCommandInteraction): Promise<void> => {
    await interaction.deferReply({
        ephemeral: false
    });

    const slashCommand = SlashCommands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        return;
    }

    const args: string[] = [];

    slashCommand.run(client, interaction, args);
};
