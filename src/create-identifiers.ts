import {  IDIDManagerCreateArgs } from '@veramo/core-types';
import { agent } from './veramo/setup.js' // use .js extension when importing local modules

async function main() {
  
  // Get alias
  let alias: string = "";
  process.argv.forEach((item, pos) => {
    if(item == "--alias") {
      alias = process.argv[pos+1];
    }
  })
  
  let identityArgs: IDIDManagerCreateArgs;
  if(alias != "") identityArgs = { alias }
  else identityArgs = { }

  const identity = await agent.didManagerCreate(identityArgs);
  console.log(`New identity created`);
  console.log(identity);
}

main().catch(console.log)