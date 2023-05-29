import { agent } from './veramo/setup.js' // use .js extension when importing local modules
import { IDIDManagerDeleteArgs, IDIDManagerFindArgs } from '@veramo/core-types';


async function main() {
  let identifiers = await agent.didManagerFind();

  identifiers.forEach( async identifier => {
    let delIdentityArgs: IDIDManagerDeleteArgs = {
      did: identifier.did
    }

    const result = await agent.didManagerDelete(delIdentityArgs)
    console.log(result);
  })
}

main().catch(console.log)