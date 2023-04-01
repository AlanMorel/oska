import { promises as fs } from "fs";

export const pathExists = async (path: string): Promise<boolean> => {
    try {
        await fs.stat(path);
    } catch (error) {
        return false;
    }

    return true;
};
