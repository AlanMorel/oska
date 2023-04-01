import { updateUserTimestamp } from "@/Cache";
import { SlashCommands } from "@/slashCommands/SlashCommands";
import { Client, CommandInteraction, Interaction } from "discord.js";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, interaction);
        }
    });
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const slashCommand = SlashCommands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    const guild = interaction.guild;
    if (guild) {
        updateUserTimestamp(guild, interaction.user.id);
    }

    await interaction.deferReply(slashCommand.deferReplyOptions);

    slashCommand.run(client, interaction);
};
