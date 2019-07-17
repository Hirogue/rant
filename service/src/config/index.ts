import * as _ from 'lodash';
import * as productionConfig from './production';

let config = {
    port: 8000,
    hostName: '0.0.0.0',

    cors: {},
};

if (process.env.NODE_ENV === 'production') {
    config = _.merge(config, productionConfig.default);
}

export { config };
export default config;
