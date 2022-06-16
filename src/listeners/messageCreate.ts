import { updateUserTimestamp } from "@/Cache";
import Config from "@/Config";
import { MessageCommands } from "@/messageCommands/MessageCommands";
import { Client, Message } from "discord.js";

export default (client: Client): void => {
    client.on("messageCreate", async (message: Message) => {
        if (message.channel.id === Config.crossPostChannelId) {
            if (message.embeds.length > 0) {
                // ignore new comments on crosspost
                if (message.embeds[0].title?.includes("New comment on")) {
                    return;
                }

                message
                    .crosspost()
                    .then(() => console.log("Crossposted message"))
                    .catch(console.error);
            }
        }

        if (message.author.bot || !message.guild) {
            return;
        }

        updateUserTimestamp(message.guild, message.author.id);

        if (!message.content.startsWith(Config.prefix)) {
            return;
        }

        const [name, ...args] = message.content.slice(Config.prefix.length).trim().split(" ");

        const command = MessageCommands.find(
            c => c.name === name.toLowerCase() || c.aliases.includes(name.toLowerCase())
        );

        if (!command) {
            return;
        }

        command.run(client, message, args);
    });
};
