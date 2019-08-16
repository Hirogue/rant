import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { connect, Connection } from 'amqplib';
import Config from "../config";

@Injectable()
export class MqService implements OnModuleInit, OnModuleDestroy {
    private client: Connection;

    async onModuleInit() {
        this.client = await connect(Config.mq.url);
    }

    async onModuleDestroy() {
        await this.client.close();
    }

    get Client() {
        return this.client;
    }

    async createChannel() {
        return await this.client.createChannel();
    }
}