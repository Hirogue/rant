import * as _ from 'lodash';
import { resolve } from 'path';
import * as productionConfig from './production';

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

    orm: {
        type: 'sqlite',
        database: 'db.sql',
        logging: true,
        dropSchema: true,
        synchronize: true,
        entities: [resolve('./**/*.model.js')]
    }
};

if (process.env.NODE_ENV === 'production') {
    Config = _.merge(Config, productionConfig.default);
}

export { Config };
export default Config;
