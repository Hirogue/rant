import * as _ from 'lodash';
import { resolve } from 'path';
import * as productionConfig from './production';

const dev = process.env.NODE_ENV !== 'production';

let Config = {
    port: 3000,
    hostName: '0.0.0.0',
    defaultPassword: '12345678',

    passport: {
        jwt: {
            ignoreExpiration: false,
            secretOrKey: 'secretKey',
        }
    },

    jwt: {
        secret: 'secretKey',
        signOptions: { expiresIn: '60s' },
    },

    cors: {},

    next: {
        dev
    },

    ssr: {
        prefix: '/_next/'
    },

    orm: {
        type: 'sqlite',
        database: 'db.sql',
        logging: false,
        dropSchema: true,
        synchronize: true,
        entities: [resolve('./**/*.model.js')]
    },

    graphql: {
        debug: true,
        playground: true,
        installSubscriptionHandlers: true,
        autoSchemaFile: 'schema.gql',
    }
};

if (!dev) {
    Config = _.merge(Config, productionConfig.default);
}

export { Config };
export default Config;
