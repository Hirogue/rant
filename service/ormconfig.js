module.exports = {
    type: 'sqlite',
    database: 'db.sql',
    logging: true,
    dropSchema: true,
    synchronize: true,
    entityPrefix: 't_',
    cache: {
        type: 'redis',
        options: {
            host: '127.0.0.1',
            port: 6379,
        },
    },
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [],
    subscribers: [__dirname + '/**/*.subscriber{.ts,.js}'],
    seeds: ['/**/*.seed.ts'],
    factories: ['/**/*.factory.ts'],
};
