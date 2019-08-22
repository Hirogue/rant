import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
// import * as Redis from 'ioredis';
import { configureWorkflow, IWorkflowHost, WorkflowBase, WorkflowConfig } from "workflow-es";
import { PublishCapitalFlow } from "../capital";
// import { RedisLockManager, RedisQueueProvider } from 'workflow-es-redis';
// import { MongoDBPersistence } from 'workflow-es-mongodb';
// import Config from "../config";
import { Logger } from "../logger";
import { LevelUpFlow } from "../user";

@Injectable()
export class WfService implements OnModuleInit, OnModuleDestroy {

    private config: WorkflowConfig;
    private host: IWorkflowHost;

    async onModuleInit() {
        Logger.trace('Workflow configuring ...');
        this.config = configureWorkflow();

        // TODO: persistence

        // const mongoPersistence = new MongoDBPersistence(Config.mongo.uri);
        // await mongoPersistence.connect;   

        // this.config.usePersistence(mongoPersistence);

        // const connection = new Redis(Config.redis);

        // this.config.useLockManager(new RedisLockManager(connection));
        // this.config.useQueueManager(new RedisQueueProvider(connection));

        Logger.trace('Workflow configured');

        this.host = this.config.getHost();

        this.register(LevelUpFlow);
        this.register(PublishCapitalFlow);

        await this.startHost();
    }

    async onModuleDestroy() {
        await this.stopHost();
    }

    get Host() {
        return this.host;
    }

    public async startHost() {
        Logger.trace('Workflow host starting ...');
        await this.host.start();
        Logger.trace('Workflow host started');
    }

    public async stopHost() {
        Logger.trace('Workflow host starting ...');
        await this.host.stop();
        Logger.trace('Workflow host started');
    }

    public register(flow: new () => WorkflowBase<unknown>) {
        return this.host.registerWorkflow(flow);
    }

    public async start(id: string, data: any, version: number = 1) {

        const token = await this.host.startWorkflow(id, version, data);

        Logger.log(`Start workflow id: ${id} version: ${version} token: ${token}`, data);

        return token;
    }

    public async resume(id: string) {
        return await this.host.resumeWorkflow(id);
    }

    public async publish(name: string, key: string, data: any, time: Date = new Date()) {

        Logger.log(`Publish event name: ${name} key: ${key}`, data);

        return await this.host.publishEvent(name, key, data, time);
    }

    public async suspend(id: string) {
        return await this.host.suspendWorkflow(id);
    }

    public async terminate(id: string) {
        return await this.host.terminateWorkflow(id);
    }
}