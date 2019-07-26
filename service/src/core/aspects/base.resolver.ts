import { BaseDataSource } from "./base.datasource";

export abstract class BaseResolver {

    protected readonly api: BaseDataSource;

    constructor(
        protected readonly context
    ) {
        this.api = context.dataSources.api;
    }
}