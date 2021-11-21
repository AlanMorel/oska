import { updateUserTimestamp } from "@/Cache";
import { SlashCommands } from "@/slashCommands/SlashCommands";
import { BaseCommandInteraction, Client, Interaction } from "discord.js";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            await handleSlashCommand(client, interaction);
        }
    });
};

const handleSlashCommand = async (client: Client, interaction: BaseCommandInteraction): Promise<void> => {
    const slashCommand = SlashCommands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: "An error has occured" });
        return;
    }

    const guild = interaction.guild;
    if (guild) {
        updateUserTimestamp(guild, interaction.user.id);
    }

    await interaction.deferReply(slashCommand.deferReplyOptions);

    slashCommand.run(client, interaction);
};
