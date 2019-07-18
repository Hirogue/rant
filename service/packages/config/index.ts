import * as _ from 'lodash';
import * as productionConfig from './production';

const ormConfig = require('../../../ormconfig');

let Config = {
    port: 3000,
    hostName: '0.0.0.0',
    defaultPassword: '12345678',

    cors: {},

    orm: ormConfig
};

if (process.env.NODE_ENV === 'production') {
    Config = _.merge(Config, productionConfig.default);
}

export { Config };
export default Config;
