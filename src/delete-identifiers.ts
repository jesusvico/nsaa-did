import { agent } from './veramo/setup.js' // use .js extension when importing local modules
import { IDIDManagerDeleteArgs, IDIDManagerFindArgs } from '@veramo/core-types';


async function main() {
  // Get alias
  let alias: string = "";
  process.argv.forEach((item, pos) => {
    if (item == "--alias") {
      alias = process.argv[pos + 1];
    }
  })

  let identityArgs: IDIDManagerFindArgs;
  if(alias != "") identityArgs = { alias }
  else identityArgs = { }


  let identifier = await agent.didManagerFind(identityArgs);

  let delIdentityArgs: IDIDManagerDeleteArgs = {
    did: identifier[0].did
  }

  const result = await agent.didManagerDelete(delIdentityArgs)
  console.log(result);
}

main().catch(console.log)