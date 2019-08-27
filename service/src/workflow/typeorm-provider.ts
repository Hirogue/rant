import { IPersistenceProvider, WorkflowInstance, EventSubscription, Event, WorkflowStatus } from "workflow-es";
import { createConnection, ConnectionOptions, Connection } from "typeorm";

export class TypeOrmPersistence implements IPersistenceProvider {

    private connection: Connection;

    constructor(private readonly options?: ConnectionOptions) { }

    public async connect() {
        this.connection = await createConnection(this.options);
    }

    public async createNewWorkflow(instance: WorkflowInstance): Promise<string> {
        return '';
    }

    public async persistWorkflow(instance: WorkflowInstance): Promise<void> {

    }

    public async getWorkflowInstance(workflowId: string): Promise<WorkflowInstance> {
        return null;
    }

    public async getRunnableInstances(): Promise<Array<string>> {
        return null;
    }

    public async createEventSubscription(subscription: EventSubscription): Promise<void> {

    }

    public async getSubscriptions(eventName: string, eventKey: string, asOf: Date): Promise<Array<EventSubscription>> {
        return null;
    }

    public async terminateSubscription(id: string): Promise<void> {

    }

    public async createEvent(event: Event): Promise<string> {
        return '';
    }

    public async getEvent(id: string): Promise<Event> {
        return null;
    }

    public async getRunnableEvents(): Promise<Array<string>> {
        return null;
    }

    public async markEventProcessed(id: string): Promise<void> {

    }

    public async markEventUnprocessed(id: string): Promise<void> {

    }

    public async getEvents(eventName: string, eventKey: any, asOf: Date): Promise<Array<string>> {
        return null;
    }
}