import {
    BaseCommandInteraction,
    ChatInputApplicationCommandData,
    Client,
    InteractionDeferReplyOptions
} from "discord.js";

export interface SlashCommand extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: BaseCommandInteraction, args: string[]) => void;
    deferReplyOptions?: InteractionDeferReplyOptions;
}
