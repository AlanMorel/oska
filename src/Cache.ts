import { promises as fs } from "fs";
import Config from "./Config";
import { getTimestamp } from "./utils/Date";
import { Logger } from "./utils/Logger";

export const caches: Caches = {};

interface Caches {
    [id: string]: Cache;
}

interface Cache {
    timestamp: string;
    users: Users;
}

interface Users {
    [id: string]: string;
}

const saveCaches = async (): Promise<void> => {
    for (const server in caches) {
        caches[server].timestamp = getTimestamp();
        const data = JSON.stringify(caches[server], null, 4);
        await fs.writeFile(`${Config.root}/logs/caches/${server}.json`, data);
    }
    const timestamp = getTimestamp();
    Logger.log(`Caches saved successfully at ${timestamp}`);
};

export const initializeCaches = async (): Promise<void> => {
    const servers = await fs.readdir(`${Config.root}/logs/caches`);
    for (const server of servers) {
        const id = server.split(".")[0];
        const data = await fs.readFile(`${Config.root}/logs/caches/${server}`, "utf8");
        const json = JSON.parse(data);
        const cache: Cache = {
            timestamp: json.timestamp,
            users: json.users
        };
        caches[id] = cache;
        Logger.log(`Loaded ${Object.keys(json.users).length} users from server ${id}`);
    }

    setInterval(saveCaches, Config.cacheInterval * 60 * 1000);

    Logger.log(`Saving caches every ${Config.cacheInterval} mins`);
};

export const updateTimestamp = (guildId: string, userId: string): void => {
    Logger.log(`Updating user ${userId} in server ${guildId}`);
    caches[guildId].users[userId] = Math.round(Date.now()).toString();
};
