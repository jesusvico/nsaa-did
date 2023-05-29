// Core interfaces
import { createAgent } from '@veramo/core';
// Core identity manager plugin
import { DIDManager } from '@veramo/did-manager';
// Ethr did identity provider
import { EthrDIDProvider } from '@veramo/did-provider-ethr';
// Web did identity provider
import { WebDIDProvider } from '@veramo/did-provider-web';
// Core key manager plugin
import { KeyManager } from '@veramo/key-manager';
// Custom key management system for RN
import { KeyManagementSystem, SecretBox } from '@veramo/kms-local';
// Custom resolvers
import { DIDResolverPlugin } from '@veramo/did-resolver';
import { Resolver } from 'did-resolver';
import { getResolver as ethrDidResolver } from 'ethr-did-resolver';
import { getResolver as webDidResolver } from 'web-did-resolver';
// Storage plugin using TypeOrm
import { Entities, KeyStore, DIDStore, PrivateKeyStore, migrations } from '@veramo/data-store';
// TypeORM is installed with `@veramo/data-store`
import { createConnection } from 'typeorm';
const IFURA_API_KEY = '529cb384bdda45eb857cddfbda9fd26a';
// This will be the secret key for the KMS
const KMS_SECRET_KEY = '45622ce36f07e04396850e10ebf29038c08ec385a6bf6589bdbab92b5ed710a1';
// This will be the name for the local sqlite database for demo purposes
const DATABASE_FILE = 'database.sqlite';
const dbConnection = createConnection({
    type: 'sqlite',
    database: DATABASE_FILE,
    synchronize: false,
    migrations,
    migrationsRun: true,
    logging: ['error', 'info', 'warn'],
    entities: Entities,
});
export const agent = createAgent({
    plugins: [
        new KeyManager({
            store: new KeyStore(dbConnection),
            kms: {
                local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(KMS_SECRET_KEY))),
            },
        }),
        new DIDManager({
            store: new DIDStore(dbConnection),
            defaultProvider: 'did:ethr:rinkeby',
            providers: {
                'did:ethr:rinkeby': new EthrDIDProvider({
                    defaultKms: 'local',
                    network: 'rinkeby',
                    rpcUrl: 'https://rinkeby.infura.io/v3/' + IFURA_API_KEY,
                }),
                'did:web': new WebDIDProvider({
                    defaultKms: 'local',
                }),
            },
        }),
        new DIDResolverPlugin({
            resolver: new Resolver(Object.assign(Object.assign({}, ethrDidResolver({ infuraProjectId: IFURA_API_KEY })), webDidResolver())),
        }),
    ],
});
