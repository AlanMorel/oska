import dotenv from "dotenv";

dotenv.config();

const token = process.env.TOKEN ?? "";
const prefix = process.env.PREFIX ?? "!";
const root = process.cwd() + "/";

export default {
    root,
    token,
    prefix
};
