import { MongoDB } from "../../functions/database.js";
import { Command } from "../../functions/commands.js";
import extras from "../../extras.js";
import { Collection } from "mongodb";



new Command({
    name: 'work',
    aliases: ['earn', 'job'],
    description: 'Earn money by working.',
    categories: ['economy'],

    async execute(client, msg, args) {
        const userdata = MongoDB.database.db('upsidedjr').collection('userdata');
        const amount = extras.random(200, 500);

        async function hasdata(udata: typeof userdata, userid: string): Promise<boolean> {
            return (await udata.findOne({ userid: userid })) !== null
        }

        if (await hasdata(userdata, msg.author.id)) {
            await userdata.updateOne({ userid: msg.author.id }, { $inc: { money: amount } });
        } else {
            await userdata.insertOne({ userid: msg.author.id, money: amount });
        }

        await msg.reply(msg.author.id === '836065103982887002' ? ` You slayed and were given ${amount}$ for being a girlboss` : `You worked and earned ${amount}$`);;
    }
})