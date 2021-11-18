import { Guild } from "discord.js";
import { promises as fs } from "fs";
import Config from "./Config";
import { getTimestamp } from "./utils/Date";
import { Logger } from "./utils/Logger";

const caches: Caches = {};

interface Caches {
    [id: string]: Cache;
}

interface Cache {
    name: string;
    timestamp: string;
    users: Users;
}

interface Users {
    [id: string]: string;
}

const saveCaches = async (): Promise<void> => {
    for (const guildId in caches) {
        caches[guildId].timestamp = getTimestamp();
        const data = JSON.stringify(caches[guildId], null, 4);
        await fs.writeFile(`${Config.root}/logs/caches/${guildId}.json`, data);
    }
    const timestamp = getTimestamp();
    Logger.log(`Caches saved successfully at ${timestamp}`);
};

export const initializeCaches = async (): Promise<void> => {
    const guilds = await fs.readdir(`${Config.root}/logs/caches`);
    for (const guild of guilds) {
        const data = await fs.readFile(`${Config.root}/logs/caches/${guild}`, "utf8");
        const cache = JSON.parse(data) as Cache;
        const guildID = guild.split(".")[0];
        caches[guildID] = cache;
        Logger.log(`Loaded ${Object.keys(cache.users).length} users from guild ${guildID}`);
    }

    setInterval(saveCaches, Config.cacheInterval * 60 * 1000);
    Logger.log(`Saving caches every ${Config.cacheInterval} mins`);
};

export const updateTimestamp = (guild: Guild, userId: string): void => {
    Logger.log(`Updating user ${userId} in guild ${guild.id}`);

    const cache = caches[guild.id] || createNewCache(guild);
    cache.users[userId] = Math.round(Date.now()).toString();
};

export const getUserCache = (guild: Guild, userId: string): string | null => {
    const cache = caches[guild.id] || createNewCache(guild);
    return cache.users[userId];
};

const createNewCache = (guild: Guild): Cache => {
    Logger.error(`Creating brand new guild cache for guild ${guild.name}`);

    const cache: Cache = {
        name: guild.name,
        timestamp: getTimestamp(),
        users: {}
    };

    caches[guild.id] = cache;

    return cache;
};
