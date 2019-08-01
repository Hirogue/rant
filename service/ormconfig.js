module.exports = {
    type: 'sqlite',
    database: 'db.sql',
    logging: true,
    dropSchema: true,
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [],
    subscribers: [__dirname + '/**/*.subscriber{.ts,.js}'],
    seeds: ['/**/*.seed.ts'],
    factories: ['/**/*.factory.ts'],
};
