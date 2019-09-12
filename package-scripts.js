const npsUtils = require('nps-utils');

module.exports = {
  scripts: {

    start: "cd ./service && yarn prod",
    stop: "cd ./service && yarn stop",

    build: {
      default: npsUtils.concurrent.nps('build.service', 'build.next', 'build.admin'),
      service: "cd ./service && yarn build:service",
      next: "cd ./service && yarn build:next",
      admin: "cd ./admin && yarn build",
    },

    dev: {
      default: npsUtils.concurrent.nps('dev.admin', 'dev.service'),
      admin: "cd ./admin && yarn dev",
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
