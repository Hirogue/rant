import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { connect, Connection } from 'amqplib';
import { Config } from "../config";
import { Logger } from "../logger";

@Injectable()
export class MqService implements OnModuleInit, OnModuleDestroy {
    private client: Connection;

    async onModuleInit() {
        Logger.trace('MessageQueue connecting ...');
        this.client = await connect(Config.mq.url);
        Logger.trace('MessageQueue connected');
    }

    async onModuleDestroy() {
        Logger.trace('MessageQueue closing ...');
        await this.client.close();
        Logger.trace('MessageQueue closed');
    }

    get Client() {
        return this.client;
    }

    async createChannel() {
        return await this.client.createChannel();
    }
}