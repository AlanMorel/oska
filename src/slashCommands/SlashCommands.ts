import { Ping } from "@/slashCommands/commands/Ping";
import { Purge } from "@/slashCommands/commands/Purge";
import { SlashCommand } from "@/slashCommands/SlashCommand";

export const SlashCommands: SlashCommand[] = [Ping, Purge];
