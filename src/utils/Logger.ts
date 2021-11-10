import Config from "@/Config";
import { getTimestamp } from "@/utils/Date";
import chalk from "chalk";
import { promises as fs } from "fs";

export class Logger {
    public static logMessageTimestamp(authorId: BigInt, createdTimestamp: number): void {
        this.writeToFile(authorId.toString(), createdTimestamp.toString());
    }

    public static log(message: string, chalkConfig: chalk.Chalk = chalk.blue, prefix: string = "log"): void {
        let content = `${chalkConfig(message)}`;

        content = `${chalkConfig("[" + prefix.toUpperCase() + "]")} ${content}`;

        const timestamp = getTimestamp();
        content = `${chalk.gray(timestamp)} ${content}`;

        console.log(`${content}`);
    }

    public static error(error: string, color: chalk.Chalk = chalk.red): void {
        this.log(error, color, "Error");
    }

    private static writeToFile(filename: string, message: string): void {
        fs.writeFile(Config.root + "/logs/" + filename + ".log", message);
    }
}
