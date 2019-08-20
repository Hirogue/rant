import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { configureWorkflow, IWorkflowHost, WorkflowBase, WorkflowConfig } from "workflow-es";
import { Logger } from "../logger";
import { UserFlow } from "./user";

@Injectable()
export class WfService implements OnModuleInit, OnModuleDestroy {

    private config: WorkflowConfig;
    private host: IWorkflowHost;

    async onModuleInit() {
        Logger.trace('Workflow configuring ...');
        this.config = configureWorkflow();
        Logger.trace('Workflow configured');

        this.host = this.config.getHost();

        this.registerList([
            UserFlow
        ]);

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

    public registerList(flows: [new () => WorkflowBase<unknown>]) {
        return flows.forEach(flow => this.host.registerWorkflow(flow));
    }

    public async start(id: string, version: number, data: any) {
        return await this.host.startWorkflow(id, version, data);
    }

    public async resume(id: string) {
        return await this.host.resumeWorkflow(id);
    }

    public async publish(name: string, key: string, data: any, time: Date) {
        return await this.host.publishEvent(name, key, data, time);
    }

    public async suspend(id: string) {
        return await this.host.suspendWorkflow(id);
    }

    public async terminate(id: string) {
        return await this.host.terminateWorkflow(id);
    }
}