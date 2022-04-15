import { Awaitable, Client, ClientEvents, Collection } from "discord.js";
import { readdir } from "fs/promises";

type evfn<T extends keyof ClientEvents> = (client: Client<true>, ...args: ClientEvents[T]) => Awaitable<void>
type keycli = keyof ClientEvents

const onceEvents = new Collection<keyof ClientEvents, evfn<keycli>>();
const onEvents = new Collection<keyof ClientEvents, evfn<keycli>>();

export function event<Y extends 'on' | 'once', T extends keycli>(type: Y, event: T, callback: evfn<T>) {
    if (type === 'once') {
        onceEvents.set(event, callback as evfn<keycli>);
    } else {;
        onEvents.set(event, callback as evfn<keycli>);
    }
}

export async function getEvents() {
    for (const event of (await readdir('./dist/events/')).filter(f => f.endsWith('.js'))) {
        await import(`../events/${event}`)
    }
}

export function loadEvents(client: Client) {
    for (const [event, callback] of onEvents) {
        client.on(event, (...args) => callback(client, ...args));
    }

    for (const [event, callback] of onceEvents) {
        client.once(event, (...args) => callback(client, ...args));
    }
}