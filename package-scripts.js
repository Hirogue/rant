const npsUtils = require('nps-utils');

module.exports = {
  scripts: {

    db: {
      init: "node ./scripts/database/init-db.sh.js",
    },

    docker: {
      init: "node ./scripts/database/docker-init-db.sh.js",
      up: "docker-compose up -d",
      down: "docker-compose down"
    }
  }
};
