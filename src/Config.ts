import dotenv from "dotenv";

dotenv.config();

const getRoot = (): string => {
    let dir = __dirname.split("dist")[0].split("src")[0];
    dir = dir.endsWith("/") ? dir.slice(0, -1) : dir;
    return dir;
};

const token = process.env.TOKEN ?? "";
const prefix = process.env.PREFIX ?? "!";
const root = getRoot();

export default {
    root,
    token,
    prefix
};
