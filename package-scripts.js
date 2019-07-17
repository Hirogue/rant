const npsUtils = require('nps-utils');

module.exports = {
  scripts: {

    db: {
      init: "node ./scripts/database/init-db.sh.js",
      seed: "cd ./service && yarn db:seed"
    },

    docker: {
      init: "node ./scripts/database/docker-init-db.sh.js",
      up: "docker-compose up -d",
      down: "docker-compose down"
    },

    install: {
      default: npsUtils.concurrent.nps('install.service', 'install.admin'),
      service: 'cd ./service && yarn',
      admin: 'cd ./admin && yarn'
    },

    dev: {
      default: npsUtils.concurrent.nps('dev.service', 'dev.admin'),
      service: 'cd ./service && yarn dev',
      admin: 'cd ./admin && yarn dev'
    }
  }
};
