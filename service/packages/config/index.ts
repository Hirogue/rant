import * as _ from 'lodash';
import * as productionConfig from './production';

let Config = {
    port: 8000,
    hostName: '0.0.0.0',

    cors: {},
};

if (process.env.NODE_ENV === 'production') {
    Config = _.merge(Config, productionConfig.default);
}

export { Config };
export default Config;
