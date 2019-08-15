const npsUtils = require('nps-utils');

module.exports = {
  scripts: {

    dev: {
      default: npsUtils.concurrent.nps('dev.admin', 'dev.service'),
      admin: "cd ./admin && yarn start",
      service: "cd ./service && yarn dev"
    },

    install: {
      default: npsUtils.concurrent.nps('install.admin', 'install.service'),
      admin: "cd ./admin && yarn",
      service: "cd ./service && yarn",
    },

    db: {
      init: "node ./scripts/database/init-db.sh.js",
      seed: "cd ./service && yarn seed",
      clear: "cd ./service && yarn orm cache:clear"
    },

    docker: {
      init: "node ./scripts/database/docker-init-db.sh.js",
      up: "docker-compose up -d",
      down: "docker-compose down"
    }
  }
};
