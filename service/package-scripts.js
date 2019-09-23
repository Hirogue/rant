const npsUtils = require('nps-utils');

const APP_PORT = process.env.APP_PORT || 8010;

module.exports = {
  scripts: {
    dev: 'concurrently --handle-input \"wait-on dist/src/main.js && nodemon\" \"tsc -w -p tsconfig.build.json\"',

    start: npsUtils.crossEnv(`NODE_ENV=production pm2 start dist/src/main.js --name 'rant:${APP_PORT}'`),

    stop: `pm2 delete 'rant:${APP_PORT}'`,

    build: {
      default: npsUtils.concurrent.nps('build.service', 'build.next'),
      service: 'rimraf ./dist && tsc -p tsconfig.build.json',
      next: 'wait-on dist/src/main.js && next build',
    },

    db: {
      seed: 'ts-node -r tsconfig-paths/register ./node_modules/typeorm-seeding/dist/cli.js seed',
      orm: 'ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js'
    },

    format: `prettier --write \"src/**/*.ts\"`,

    lint: 'tslint -p tsconfig.json -c tslint.json',

    test: {
      default: 'jest',
      watch: 'jest --watch',
      cov: 'jest --coverage',
      debug: 'node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand',
      e2e: 'jest --config ./test/jest-e2e.json',
    }
  }
};
