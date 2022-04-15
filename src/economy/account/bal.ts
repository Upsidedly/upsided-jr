import { MongoDB } from "../../functions/database.js";
import { Command } from "../../functions/commands.js";
import extras from "../../extras.js";
import { MessageEmbed } from "discord.js";



new Command({
    name: 'balance',
    aliases: ['bal'],
    description: 'check ur balance',
    categories: ['economy'],

    async execute(client, msg, args) {
        const userdata = MongoDB.database.db('upsidedjr').collection('userdata');

        async function hasdata(udata: typeof userdata, userid: string): Promise<boolean> {
            return (await udata.findOne({ userid: userid })) !== null
        }

        if (await hasdata(userdata, msg.author.id)) {
            const data = await userdata.findOne({ userid: msg.author.id })!
            await msg.reply({ embeds: [
                new MessageEmbed({
                    title: 'balance',
                    fields: [
                        { name: 'wallet', value: `$${data!.money}` },
                        { name: 'bank', value: `$${data!.bank ? data!.bank : '0'}` },
                    ]
                }).setTimestamp()
            ]})
        } else {
            //
            await msg.reply({ embeds: [
                new MessageEmbed({
                    title: 'balance',
                    fields: [
                        { name: 'wallet', value: '$0' },
                        { name: 'bank', value: '$0' },
                    ]
                }).setTimestamp()
            ]})
        };
    }
})