const { resolve } = require('path');

module.exports = {
    type: 'sqlite',
    database: 'db.sql',
    logging: true,
    dropSchema: true,
    synchronize: true,
    entities: [resolve('./**/*.model.js')],
    seeds: ['./src/database/seeds/**/*.seed.ts'],
    factories: ['./src/database/seeds/**/*.factory.ts'],
};
