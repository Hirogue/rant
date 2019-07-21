import _ from 'lodash';
import Logger from 'js-logger';
import productionConfig from './production';

const dev = process.env.NODE_ENV !== 'production';

let Config = {
  apollo: {
    uri: 'http://127.0.0.1:3000/graphql',
  },

  logger: {
    defaultLevel: Logger.TRACE,
  },
};

if (!dev) {
  Config = _.merge(Config, productionConfig);
}

export { Config };
export default Config;
