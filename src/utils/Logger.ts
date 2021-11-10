import Config from "@/Config";
import chalk from "chalk";
import { promises as fs } from "fs";

const timestampOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
} as Intl.DateTimeFormatOptions;

export class Logger {
    public static logMessageTimestamp(authorId: BigInt, createdTimestamp: number): void {
        this.writeToFile(authorId.toString(), createdTimestamp.toString());
    }

    public static log(message: string, chalkConfig: chalk.Chalk = chalk.blue, prefix: string = "log"): void {
        let content = `${chalkConfig(message)}`;

        content = `${chalkConfig("[" + prefix.toUpperCase() + "]")} ${content}`;

        const timestamp = this.getTimestamp();
        content = `${chalk.gray(timestamp)} ${content}`;

        console.log(`${content}`);
    }

    private static getTimestamp(): string {
        return new Date().toLocaleDateString("en-US", timestampOptions);
    }

    private static writeToFile(filename: string, message: string): void {
        fs.appendFile(Config.root + "/logs/" + filename + ".log", message);
    }
}
