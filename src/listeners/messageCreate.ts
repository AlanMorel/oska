import Config from "@/Config";
import { MessageCommands } from "@/messageCommands/MessageCommands";
import { Client, Message } from "discord.js";

export default (client: Client): void => {
    client.on("messageCreate", async (message: Message) => {
        if (message.author.bot || !message.guild || !message.content.startsWith(Config.prefix)) {
            return;
        }

        const [name, ...args] = message.content.slice(Config.prefix.length).trim().split(" ");

        const command = MessageCommands.find(
            c => c.name === name.toLowerCase() || c.aliases.includes(name.toLowerCase())
        );

        if (!command) {
            return;
        }

        await command.run(client, message, args);
    });
};
