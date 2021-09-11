import { BaseCommandInteraction, ChatInputApplicationCommandData, Client } from "discord.js";

export interface SlashCommand extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: BaseCommandInteraction, args: string[]) => void;
}
