import { pathExists } from "@/utils/PathExists";
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
    const timestamp = getTimestamp();

    for (const guildId in caches) {
        caches[guildId].timestamp = timestamp;

        const data = JSON.stringify(caches[guildId], null, 4);
        await fs.writeFile(`${Config.root}/logs/caches/${guildId}.json`, data);
    }

    Logger.log(`Caches saved successfully at ${timestamp}`);
};

const getCache = (guild: Guild): Cache => {
    return caches[guild.id] || createNewCache(guild);
};

const createNewCache = (guild: Guild): Cache => {
    Logger.log(`Creating brand new guild cache for guild ${guild.name}`);

    const cache: Cache = {
        name: guild.name,
        timestamp: getTimestamp(),
        users: {}
    };

    caches[guild.id] = cache;

    return cache;
};

export const initializeCaches = async (): Promise<void> => {
    const exists = await pathExists(`${Config.root}/logs/caches`);

    if (!exists) {
        Logger.log("Creating new cache directory");
        await fs.mkdir(`${Config.root}/logs/caches`, { recursive: true });
    }

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

export const updateUserTimestamp = (guild: Guild, userId: string): void => {
    const cache = getCache(guild);
    cache.users[userId] = Math.round(Date.now()).toString();
};

export const getUserTimestamp = (guild: Guild, userId: string): string => {
    const cache = getCache(guild);
    return cache.users[userId];
};
