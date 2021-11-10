import { Ping } from "@/slashCommands/Ping";
import { Purge } from "@/slashCommands/Purge";
import { SlashCommand } from "@/slashCommands/SlashCommand";

export const SlashCommands: SlashCommand[] = [Ping, Purge];
