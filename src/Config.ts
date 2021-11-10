import dotenv from "dotenv";

dotenv.config();

const token = process.env.TOKEN ?? "";
const prefix = process.env.PREFIX ?? "!";
const root = process.cwd() + "/";
const locale = process.env.LOCALE ?? "en-US";

export default {
    root,
    token,
    prefix,
    locale
};
