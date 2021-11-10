import Config from "@/Config";
import { SlashCommand } from "@/slashCommands/SlashCommand";
import { getTimestamp } from "@/utils/Date";
import { Logger } from "@/utils/Logger";
import { BaseCommandInteraction, Client, GuildMember } from "discord.js";
import { promises as fs } from "fs";

const DAY = 24 * 60 * 60 * 1000;
const PURGE_DURATION = 7 * DAY;

export const Purge: SlashCommand = {
    name: "purge",
    description: "Returns list of people to purge",
    type: "CHAT_INPUT",
    deferReplyOptions: {
        ephemeral: true
    },
    run: async (client: Client, interaction: BaseCommandInteraction, args: string[]) => {
        const guild = interaction.guild;

        if (!guild || !client) {
            Logger.error("No valid guild or client found!");
            return;
        }

        const members = await guild.members.fetch();

        const purge: GuildMember[] = [];

        for (const member of members.values()) {
            const user = member.user;
            const username = user.username + "#" + user.discriminator;

            if (user.bot) {
                Logger.error(username + " is a bot");
                continue;
            }

            const roles = member.roles.cache.filter(role => role.name !== "@everyone").map(role => role.name);

            if (roles.length > 0) {
                Logger.log(username + " has roles: " + roles.join(", "));
                continue;
            }

            const rawTimestamp = await getLastMessageTimestamp(user.id);

            if (!rawTimestamp) {
                purge.push(member);
                Logger.log(username + " should be purged for having no messages");
                continue;
            }

            const timestamp = parseInt(rawTimestamp);
            const readableTimestamp = getTimestamp();

            Logger.log(username + "'s last message was on " + readableTimestamp + ", " + getDaysAgo(timestamp));

            if (Date.now() - timestamp > PURGE_DURATION) {
                Logger.log(username + " should be purged for inactivity");
                purge.push(member);
                continue;
            }

            Logger.log(username + " should not be purged");
        }

        if (!purge.length) {
            await interaction.followUp({
                ephemeral: true,
                content: "Nobody needs to be purged!"
            });
            return;
        }

        const prefix = purge.length + " people should be purged: ";

        let results = purge.map(member => {
            const user = member.user;
            return user.username + "#" + user.discriminator;
        });

        results = results.sort();

        await interaction.followUp({
            ephemeral: true,
            content: prefix + results.join(", ")
        });
    }
};

const getLastMessageTimestamp = async (id: string): Promise<string> => {
    const path = `${Config.root}/logs/${id}.log`;
    try {
        return await fs.readFile(path, "utf8");
    } catch (error) {
        return "";
    }
};

const getDaysAgo = (timestamp: number): string => {
    const date = new Date(timestamp);
    const deltaDays = (date.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    const formatter = new Intl.RelativeTimeFormat(Config.locale);
    return formatter.format(Math.round(deltaDays), "days");
};
