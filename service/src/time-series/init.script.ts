import { InfluxDB } from 'influx';
import { Config } from '../config';
import { Logger } from '../logger';

export async function init() {
  const client = new InfluxDB(Config.influx);

  Logger.trace(`Drop database ${Config.influx.database} ...`);

  await client.dropDatabase(Config.influx.database);

  Logger.trace(`Create database ${Config.influx.database} ...`);

  await client.createDatabase(Config.influx.database);

  Logger.trace('Create retention policy 1year ...');

  await client.createRetentionPolicy('1year', {
    duration: '366d',
    replication: 1,
  });

  Logger.trace('Create retention policy 1day ...');

  await client.createRetentionPolicy('1day', {
    duration: '1d',
    replication: 1,
  });
}
