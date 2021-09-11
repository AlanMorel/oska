import { Client, Message } from "discord.js";

export interface MessageCommand {
    name: string;
    aliases: string[];
    run: (client: Client, message: Message, args: string[]) => void;
}
