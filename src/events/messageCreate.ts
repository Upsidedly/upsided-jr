import { resolve } from "jsonsided";
import { event } from "../functions/events.js";
import { commands } from "../functions/commands.js";

const config = await resolve('./config.json')

event('on', 'messageCreate', async (client, msg) => {
    if (msg.author.bot || !msg.content.toLowerCase().startsWith(config.prefix)) return;

    const args = msg.content.split(/ +/)
    const name = args.shift()!.substring(config.prefix.length).toLowerCase().trim()

    const command = commands.get(name)

    if (!command) return;

    await command.execute(client, msg, args, name)
});