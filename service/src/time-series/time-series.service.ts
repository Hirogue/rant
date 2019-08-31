import { Injectable, OnModuleInit } from "@nestjs/common";
import { InfluxDB } from 'influx';
import { Config } from "../config";
import { Logger } from "../logger";

@Injectable()
export class TimeSeriesService implements OnModuleInit {
    private client: InfluxDB;

    async onModuleInit() {
        Logger.trace('TimeSeries connecting ...');

        this.client = new InfluxDB(Config.influx);

        const dbNames = await this.client.getDatabaseNames();

        if (!dbNames.includes(Config.influx.database)) {
            await this.client.createDatabase(Config.influx.database);
        }

        Logger.trace('TimeSeries connected');

    }

    get Client() {
        return this.client;
    }

}