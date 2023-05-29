var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { agent } from './veramo/setup.js'; // use .js extension when importing local modules
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Get alias
        let alias = "";
        process.argv.forEach((item, pos) => {
            if (item == "--alias") {
                alias = process.argv[pos + 1];
            }
        });
        let identityArgs;
        if (alias != "")
            identityArgs = { alias };
        else
            identityArgs = {};
        const identity = yield agent.didManagerCreate(identityArgs);
        console.log(`New identity created`);
        console.log(identity);
    });
}
main().catch(console.log);
