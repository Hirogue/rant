export default {
  port: 8009,
  hostName: '0.0.0.0',
  serverUrl: 'http://127.0.0.1:8009',
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
};
