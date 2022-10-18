import { program } from 'commander';
import fs from 'fs'; // Filesystem
import path from 'path'; // Path routing
import { collections } from 'web3-config';
import Generator from './generator'; // Generator
import { logger } from './logger'; // Logging
import { whitelisted } from './whitelisted';

program.option('--dropId <char>');

program.parse();

const { dropId } = program.opts();

if (!whitelisted[dropId]) {
  throw new Error(`${dropId} does not exist`);
}

(async () => {
  const holders = whitelisted[dropId];
  const airdropPath: string = path.join(
    __dirname,
    `./tree/${dropId}-addresses.json`
  );

  fs.writeFileSync(airdropPath, JSON.stringify(holders));

  new Generator(dropId, holders);
})();
