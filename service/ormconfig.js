const { resolve } = require('path');

module.exports = {
    type: 'sqlite',
    database: 'db.sql',
    logging: true,
    dropSchema: true,
    synchronize: true,
    entities: [resolve('./**/*.model.js')],
    seeds: [resolve('./**/*.seed.ts')],
    factories: [resolve('./**/*.factory.ts')],
};
