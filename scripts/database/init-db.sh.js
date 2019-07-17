const sh = require('shelljs');
const utils = require('../utils');

utils.checkDependencies(['psql']);

sh.exec('cross-env PGPASSWORD=123456 psql -U postgres -f create-db.sql');
