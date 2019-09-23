import { FieldType } from 'influx';
import { MeasurementEnum } from '../src/time-series';
import { resolve } from 'path';

const dev = process.env.NODE_ENV !== 'production';
const rootPath = resolve('./');

export default {
    dev,

    port: 3000,
    host: '0.0.0.0',
    serverUrl: 'http://127.0.0.1:3000',
    defaultPassword: '12345678',

    swagger: {
        path: 'docs',
        title: 'Rant',
        description: 'The rant API description',
        version: '0.0.1'
    },

    seo: {
        title: 'Rant',
        keywords: '',
        description: ''
    },

    staticAssets: [
        { path: './static', options: { prefix: '/static' } },
        { path: '../admin/dist', options: { prefix: '/admin/' } },
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
        url: 'amqp://guest:guest@127.0.0.1:5672',
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
            expire: 5 * 60,
            url: '',
            account: '',
            secret: '',
            templates: {
                register: '【旅游项目通】尊敬的用户，您的注册验证码是{$var1}, {$var2}分钟内有效,如非本人操作，请勿泄露！',
                password: '【旅游项目通】尊敬的用户，您在尝试重置密码，验证码是：{$var1}，{$var2}分钟内有效，如非本人操作，请勿泄露！'
            }
        },
    },

    orm: {
        type: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        database: 'rant',
        username: 'rant',
        password: '123456',
        logging: ["error"],
        dropSchema: false,
        synchronize: false,
        entityPrefix: 't_',
        entities: [rootPath + '/**/*.entity.js'],
        subscribers: [rootPath + '/**/*.subscriber.js']
    },

    mongo: {
        uri: 'mongodb://root:123456@127.0.0.1:27017/workflow-node'
    },

    // influx: {
    //     host: '127.0.0.1',
    //     database: 'rant',
    //     schema: [
    //         {
    //             measurement: MeasurementEnum.MODULE_ACCESS,
    //             fields: {
    //                 module: FieldType.STRING,
    //                 id: FieldType.STRING,
    //             },
    //             tags: ['ip']
    //         },
    //         {
    //             measurement: MeasurementEnum.ACCESS,
    //             fields: {
    //                 method: FieldType.STRING,
    //                 path: FieldType.STRING,
    //                 userAgent: FieldType.STRING,
    //                 statusCode: FieldType.INTEGER
    //             },
    //             tags: ['ip']
    //         },
    //     ]
    // },

    graphql: {
        debug: true,
        playground: true,
        installSubscriptionHandlers: true,
        autoSchemaFile: 'schema.gql'
    },

    static: {
        root: '/static',
        uploads: '/uploads'
    },

    apply: {
        v0Limit: 1,
        v1Limit: 3
    },

    wechat: {
        appid: process.env.APPID,
        secret: process.env.APPSECRET,
    }

}