import * as _ from 'lodash';
import { FieldType } from 'influx';
import * as productionConfig from './production';
import { MeasurementEnum } from '../time-series';

const dev = process.env.NODE_ENV !== 'production';

let Config = {
  dev,
  port: 3000,
  hostName: '0.0.0.0',
  serverUrl: 'http://127.0.0.1:3000',
  defaultPassword: '12345678',

  seo: {
    title: '',
    keywords: '',
    description: '',
  },

  staticAssets: [
    { path: './static', options: { prefix: '/static' } },
    { path: '../admin/dist', options: { prefix: '/admin/' } },
    { path: '../lvyoto/dist', options: { prefix: '/lvyoto/' } },
  ],

  passport: {
    jwt: {
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    },
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
    max: 1000,
  },

  next: {
    dev,
  },

  ssr: {
    prefix: '/_next/',
  },

  mq: {
    url: 'amqp://guest:guest@127.0.0.1:5672',
    options: {},
  },

  redis: {
    name: 'rant',
    host: '127.0.0.1',
    port: 6379,
  },

  cache: {
    ttl: 1, // seconds
    max: 500, // maximum number of items in cache
  },

  verification: {
    svg: {
      expire: 5 * 60,
    },
    sms: {
      expire: 5 * 60,
      url: '',
      account: '',
      secret: '',
      templates: {
        register:
          '【旅游项目通】尊敬的用户，您的注册验证码是{$var1}, {$var2}分钟内有效,如非本人操作，请勿泄露！',
        password:
          '【旅游项目通】尊敬的用户，您在尝试重置密码，验证码是：{$var1}，{$var2}分钟内有效，如非本人操作，请勿泄露！',
      },
    },
  },

  orm: {
    // type: 'sqlite',
    // database: 'db.sql',
    type: 'postgres',
    host: process.env.TEST ? '192.168.100.30' : '127.0.0.1',
    port: 5432,
    database: 'rant',
    username: 'rant',
    password: '123456',
    logging: ['error'],
    dropSchema: false,
    synchronize: false,
    entityPrefix: 't_',
    cache: {
      type: 'redis',
      options: {
        host: process.env.TEST ? '192.168.100.30' : '127.0.0.1',
        port: 6379,
      },
    },
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
  },

  mongo: {
    uri: 'mongodb://root:123456@127.0.0.1:27017/workflow-node',
  },

  influx: {
    host: '127.0.0.1',
    database: 'rant',
    schema: [
      {
        measurement: MeasurementEnum.MODULE_ACCESS,
        fields: {
          module: FieldType.STRING,
          id: FieldType.STRING,
        },
        tags: ['ip'],
      },
      {
        measurement: MeasurementEnum.ACCESS,
        fields: {
          method: FieldType.STRING,
          path: FieldType.STRING,
          userAgent: FieldType.STRING,
          statusCode: FieldType.INTEGER,
        },
        tags: ['ip'],
      },
    ],
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
    uploads: '/uploads',
  },

  apply: {
    v0Limit: 1,
    v1Limit: 3,
  },

  wechat: {
    appid: process.env.APPID,
    secret: process.env.APPSECRET,
  },
};

if (!Config.dev) {
  Config = _.merge(Config, productionConfig.default);
}

export { Config };
export default Config;
