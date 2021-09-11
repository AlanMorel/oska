import dotenv from "dotenv";

dotenv.config();

const token = process.env.TOKEN ?? "";
const prefix = process.env.PREFIX ?? "!";

export default {
    token,
    prefix
};
