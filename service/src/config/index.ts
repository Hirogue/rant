import * as _ from 'lodash';
import * as productionConfig from './production';

const dev = process.env.NODE_ENV !== 'production';

let Config = {
    dev,
    port: 3000,
    hostName: '0.0.0.0',
    serverUrl: 'http://127.0.0.1:3000',
    defaultPassword: '12345678',

    staticAssets: [
        { path: './static', options: { prefix: '/static' } },
        { path: '../admin/dist', options: { prefix: '/admin/' } },
        { path: '../lvyoto/dist', options: { prefix: '/lvyoto/' } },
    ],

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

    mq: {
        url: 'amqp://localhost',
        options: {}
    },

    redis: {
        name: 'rant',
        host: '127.0.0.1',
        port: 6379
    },

    cache: {
        ttl: 1, // seconds
        max: 500, // maximum number of items in cache
    },

    verification: {
        svg: {
            expire: 5 * 60
        },
        sms: {
            expire: 5 * 60
        }
    },

    orm: {
        type: 'sqlite',
        database: 'db.sql',
        logging: ["error", "query", "log"],
        dropSchema: false,
        synchronize: false,
        entityPrefix: 't_',
        cache: {
            type: 'redis',
            options: {
                host: '127.0.0.1',
                port: 6379,
            },
        },
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}']
    },

    mongo: {
        uri: 'mongodb://root:123456@127.0.0.1:27017/workflow-node'
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

    apply: {
        v0Limit: 1,
        v1Limit: 3
    }

};

if (!Config.dev) {
    Config = _.merge(Config, productionConfig.default);
}

export { Config };
export default Config;
