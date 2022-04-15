import { MessageEmbed } from "discord.js";
import { Command } from "../../functions/commands.js";

new Command({
    name: 'ping',
    description: 'pong',
    categories: ['bot'],

    async execute(client, msg, args, alias) {
        msg.reply({ embeds: [
            new MessageEmbed({
                title: 'Pong! 🏓',
                fields: [
                    { name: 'Latency', value: `\`${Date.now() - msg.createdTimestamp}ms\``},
                    { name: 'API Latency', value: `\`${client.ws.ping}ms\``}
                ]
            })
        ]})
    }
})