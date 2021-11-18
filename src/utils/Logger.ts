import Config from "@/Config";
import { getTimestamp } from "@/utils/Date";
import chalk from "chalk";
import { promises as fs } from "fs";

export class Logger {
    public static logMessage(guildId: string, authorId: string, createdTimestamp: number): void {
        this.writeToFile(`timestamps/${guildId}/${authorId}`, createdTimestamp.toString());
    }

    public static log(message: string, chalkConfig: chalk.Chalk = chalk.blue, prefix: string = "log"): void {
        const timestamp = getTimestamp();
        const content = `[${prefix.toUpperCase()}] ${message}`;

        console.log(`${chalk.gray(timestamp)} ${chalkConfig(content)}`);
        this.writeToFile("log", `${timestamp} ${content}`);
    }

    public static error(error: string, color: chalk.Chalk = chalk.red): void {
        this.log(error, color, "Error");
    }

    private static writeToFile(filename: string, message: string): void {
        fs.appendFile(`${Config.root}/logs/${filename}.log`, `${message}\r\n`);
    }
}
