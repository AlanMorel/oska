import { ChatInputApplicationCommandData, Client, CommandInteraction, InteractionDeferReplyOptions } from "discord.js";

export interface SlashCommand extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: CommandInteraction) => void;
    deferReplyOptions?: InteractionDeferReplyOptions;
}
