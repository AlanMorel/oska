import Config from "@/Config";
import { getTimestamp } from "@/utils/Date";
import { pathExists } from "@/utils/PathExists";
import { promises as fs } from "fs";
import picocolors from "picocolors";
import { Formatter } from "picocolors/types";

const { blue, red, gray } = picocolors;

export class Logger {
    public static logMessage(guildId: string, authorId: string, createdTimestamp: number): void {
        this.writeToFile(`timestamps/${guildId}/${authorId}`, createdTimestamp.toString());
    }

    public static log(message: string, color: Formatter = blue, prefix: string = "log"): void {
        const timestamp = getTimestamp();
        const content = `[${prefix.toUpperCase()}] ${message}`;

        console.log(`${gray(timestamp)} ${color(content)}`);
        this.writeToFile("log", `${timestamp} ${content}`);
    }

    public static error(error: string, color: Formatter = red): void {
        this.log(error, color, "Error");
    }

    public static async writeToFile(filename: string, message: string): Promise<void> {
        const directory = `${Config.root}/logs`;
        const path = `${directory}/${filename}.log`;

        const exists = await pathExists(directory);

        if (!exists) {
            await fs.mkdir(directory, { recursive: true });
        }

        await fs.appendFile(path, `${message}\r\n`);
    }
}
