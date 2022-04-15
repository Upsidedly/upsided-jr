import { Client as Bot, Intents } from 'discord.js';
import { resolve } from 'jsonsided';
import { getEvents, loadEvents } from './functions/events.js';
import { getCommands } from './functions/commands.js';
import { MongoClient } from 'mongodb';
import { MongoDB } from './functions/database.js';

const config = await resolve('./config.json');
MongoDB.database = new MongoClient(config.mongo.url);

const Client = new Bot({ intents: new Intents(32767) });

await getEvents();
loadEvents(Client);

await getCommands()

await Client.login((await resolve('./config.json')).token);
