import { event } from "../functions/events.js";
import chalk from 'chalk';

event('once', 'ready', (client) => {
  const { size } = client.guilds.cache
  console.log (
    `Logged in as ${chalk.bold(client.user.tag)} in ${chalk.bold(size)} guild${size === 1 ? '' : 's'}`
  );
});