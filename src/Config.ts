import dotenv from "dotenv";

dotenv.config();

const token = process.env.TOKEN ?? "";
const prefix = process.env.PREFIX ?? "!";
const root = `${process.cwd()}/`;
const locale = process.env.LOCALE ?? "en-US";
const cacheInterval = parseInt(process.env.CACHE_INTERVAL ?? "60");
const crossPostChannelId = process.env.CROSS_POST_CHANNEL_ID ?? "";

export default {
    root,
    token,
    prefix,
    locale,
    cacheInterval,
    crossPostChannelId
};
