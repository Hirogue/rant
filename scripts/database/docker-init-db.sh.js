const sh = require('shelljs');
const utils = require('../utils');

utils.checkDependencies(['docker']);

sh.exec("docker inspect --format='{{.Id}}' postgres", (code, stdout, stderr) => {
    const containerId = stdout.toString().substr(0, 12);
    sh.exec(`docker exec -i ${containerId} psql -U postgres -f /database/create-db.sql`);
});