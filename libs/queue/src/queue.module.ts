import { DynamicModule, Global, Logger, Module, OnModuleInit } from '@nestjs/common';
import { BullExplorer } from './queue.explorer';
import { BullModuleAsyncOptions, BullModuleOptions } from './queue.interfaces';
import { createAsyncQueueOptionsProviders, createQueueOptionProviders, createQueueProviders } from './queue.providers';

@Global()
@Module({})
export class QueueModule implements OnModuleInit {
    static register(options: BullModuleOptions | BullModuleOptions[]): DynamicModule {
        const queueProviders = createQueueProviders([].concat(options));
        const queueOptionProviders = createQueueOptionProviders([].concat(options));
        return {
            module: QueueModule,
            providers: [...queueOptionProviders, ...queueProviders, BullExplorer, { provide: Logger, useValue: new Logger('QueueModule') }],
            exports: queueProviders
        };
    }

    static registerAsync(options: BullModuleAsyncOptions | BullModuleAsyncOptions[]): DynamicModule {
        const optionsArr = [].concat(options);
        const queueProviders = createQueueProviders(optionsArr);
        const queueOptionProviders = createAsyncQueueOptionsProviders(optionsArr);
        const imports =
            optionsArr
                .map((option) => option.imports)
                .reduce((acc, i) => {
                    return acc.concat(i || []);
                }, [])
                .filter((v, i, a) => a.indexOf(v) === i) || [];
        return {
            imports,
            module: QueueModule,
            providers: [...queueOptionProviders, ...queueProviders, BullExplorer, { provide: Logger, useValue: new Logger('QueueModule') }],
            exports: queueProviders
        };
    }

    constructor(private readonly explorer: BullExplorer) {}

    onModuleInit() {
        this.explorer.explore();
    }
}
