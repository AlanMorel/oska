import { formatTimestamp } from "@/utils/Date";
import { pathExists } from "@/utils/PathExists";
import { promises as fs } from "fs";
import picocolors from "picocolors";
import { Formatter } from "picocolors/types";

const { blue, red } = picocolors;

export class Logger {
    public static logMessage(guildId: string, authorId: string, createdTimestamp: number): void {
        this.write(`timestamps/${guildId}/`, `${authorId}`, createdTimestamp.toString());
    }

    public static error(error: string, color: Formatter = red): void {
        this.log(error, color);
    }

    public static log(message: string, color: Formatter = blue): void {
        console.log(`${color(message)}`);
        this.writeToFile("log", message);
    }

    private static async writeToFile(type: string, message: string, id: string | null = null): Promise<void> {
        const now = new Date();

        const timestamp = now.toISOString().split("T")[0];
        const [year, month] = [...timestamp.split("-")];

        const timestampReadable = formatTimestamp(now);
        const log = `[${timestampReadable}]: ${message}\r\n`;

        await this.write(`logs/${type}/${year}/${month}`, timestamp, log);

        if (id) {
            await this.write(`logs/users/${id}/${type}/${year}/${month}`, timestamp, log);
        }
    }

    private static async write(directory: string, filename: string, message: string): Promise<void> {
        const path = `${directory}/${filename}.log`;

        const exists = await pathExists(directory);

        if (!exists) {
            await fs.mkdir(directory, { recursive: true });
        }

        await fs.appendFile(path, message);
    }
}
