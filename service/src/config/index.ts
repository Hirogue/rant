import * as _ from 'lodash';
import * as productionConfig from './production';

const dev = process.env.NODE_ENV !== 'production';

let Config = {
    dev,
    port: 3000,
    hostName: '0.0.0.0',
    serverUrl: 'http://127.0.0.1:3000',
    defaultPassword: '12345678',

    passport: {
        jwt: {
            ignoreExpiration: false,
            secretOrKey: 'secretKey',
        }
    },

    jwt: {
        secret: 'secretKey',
        signOptions: { expiresIn: '10d' },
    },

    cors: {},

    csrf: { cookie: true },

    helmet: {},

    rateLimit: {
        windowMs: 1 * 60 * 1000,
        max: 1000
    },

    next: {
        dev
    },

    ssr: {
        prefix: '/_next/'
    },

    orm: {
        type: 'sqlite',
        database: 'db.sql',
        logging: true,
        dropSchema: false,
        synchronize: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}']
    },

    graphql: {
        debug: true,
        playground: true,
        installSubscriptionHandlers: true,
        autoSchemaFile: 'schema.gql',
        typePaths: [__dirname + '/../**/*.graphql'],
    },

    static: {
        root: '/static',
        uploads: '/uploads'
    },

};

if (!Config.dev) {
    Config = _.merge(Config, productionConfig.default);
}

export { Config };
export default Config;
