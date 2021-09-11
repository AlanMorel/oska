import { MessageCommand } from "@/messageCommands/MessageCommand";
import { Client, Message } from "discord.js";

export const Ping: MessageCommand = {
    name: "ping",
    aliases: ["p"],
    run: async (client: Client, message: Message, args: string[]) => {
        message.channel.send(`${client.ws.ping}ms ping`);
    }
};
