import { Awaitable, Client, Collection, Message } from "discord.js";
import { readdir } from "fs/promises";

type command = {
    name: string,
    aliases?: string[],
    description: string,
    categories?: string[],
    execute: (client: Client, message: Message, args: string[], alias: string) => Awaitable<void>
}

export const commands = new Collection<string, command>();

export class Command {
    constructor(data: command) {
        commands.set(data.name, data)
        if (data.aliases) {
            for (const alias of data.aliases) {
                commands.set(alias, data)
            }
        }
    }
}

export async function getCommands() {
    for (const dir of await readdir('./dist/commands/')) {
        for (const file of (await readdir(`./dist/commands/${dir}`)).filter(f => f.endsWith('.js'))) {
            await import(`../commands/${dir}/${file}`)
        }
    } for (const dir of await readdir('./dist/economy/')) {
        for (const file of (await readdir(`./dist/economy/${dir}`)).filter(f => f.endsWith('.js'))) {
            await import(`../economy/${dir}/${file}`)
        }
    }
}