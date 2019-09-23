export default {
    port: 8010,
    host: '0.0.0.0',
    serverUrl: 'http://127.0.0.1:8010',
    defaultPassword: '12345678',

    orm: {
        type: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        database: 'rant',
        username: 'rant',
        password: '123456',
        logging: ['error'],
    },
}