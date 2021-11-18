import { getUserTimestamp } from "@/Cache";
import { SlashCommand } from "@/slashCommands/SlashCommand";
import { Logger } from "@/utils/Logger";
import { BaseCommandInteraction, Client, GuildMember, User } from "discord.js";

const DAY = 24 * 60 * 60 * 1000;
const PURGE_IMMUNITY_DURATION = 7 * DAY;

export const Purge: SlashCommand = {
    name: "purge",
    description: "Returns list of people to purge",
    type: "CHAT_INPUT",
    deferReplyOptions: {
        ephemeral: true
    },
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const guild = interaction.guild;

        if (!guild) {
            Logger.error("No valid guild found!");
            return;
        }

        const members = await guild.members.fetch();
        const purge = await getPurgeList(members.values());

        if (!purge.length) {
            await interaction.followUp({
                ephemeral: true,
                content: "Nobody needs to be purged!"
            });
            return;
        }

        const results = purge
            .map(user => user.username)
            .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

        const content = `**${purge.length}** people should be purged\n\n${results.join(", ")}`;

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};

const getPurgeList = async (members: IterableIterator<GuildMember>): Promise<User[]> => {
    const purge: User[] = [];

    for (const member of members) {
        const user = member.user;
        if (user.bot) {
            continue;
        }

        const roles = member.roles.cache.filter(role => role.name !== "@everyone").map(role => role.name);
        if (roles.length > 0) {
            continue;
        }

        const rawTimestamp = getUserTimestamp(member.guild, user.id);
        if (!rawTimestamp) {
            purge.push(user);
            continue;
        }

        const timestamp = parseInt(rawTimestamp);
        if (Date.now() - timestamp > PURGE_IMMUNITY_DURATION) {
            purge.push(user);
        }
    }

    return purge;
};
