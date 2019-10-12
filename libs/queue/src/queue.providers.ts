import { Logger, Provider } from '@nestjs/common';
import * as Bull from 'bull';
import { Queue } from 'bull';
import { BullModuleAsyncOptions, BullModuleOptions } from './queue.interfaces';
import {
    BullQueueProcessor,
    isAdvancedProcessor,
    isAdvancedSeparateProcessor,
    isProcessorCallback,
    isSeparateProcessor
} from './queue.types';
import { getQueueOptionsToken, getQueueToken } from './queue.utils';

function buildQueue(option: BullModuleOptions): Queue {
    const queue: Queue = new Bull(option.name ? option.name : 'default', option.options);
    if (option.processors) {
        option.processors.forEach((processor: BullQueueProcessor) => {
            let args = [];
            if (isAdvancedProcessor(processor)) {
                Logger.warn(`The 'AdvancedProcessors' are deprecated and will soon be removed.`, 'BullModule', false);
                args.push(processor.name, processor.concurrency, processor.callback);
            } else if (isAdvancedSeparateProcessor(processor)) {
                args.push(processor.name, processor.concurrency, processor.path);
            } else if (isSeparateProcessor(processor)) {
                args.push(processor);
            } else if (isProcessorCallback(processor)) {
                Logger.warn(`The 'ProcessorCallbacks' are deprecated and will soon be removed.`, 'BullModule', false);
                args.push(processor);
            }
            args = args.filter((arg) => !!arg);
            (queue.process as any)(...args);
        });
    }
    return queue;
}

export function createQueueOptionProviders(options: BullModuleOptions[]): any {
    return options.map((option) => ({
        provide: getQueueOptionsToken(option.name),
        useValue: option
    }));
}

export function createQueueProviders(options: BullModuleOptions[]): any {
    return options.map((option) => ({
        provide: getQueueToken(option.name),
        useFactory: (o) => buildQueue(o),
        inject: [getQueueOptionsToken(option.name)]
    }));
}

export function createAsyncQueueOptionsProviders(options: BullModuleAsyncOptions[]): Provider[] {
    return options.map((option) => ({
        provide: getQueueOptionsToken(option.name),
        useFactory: option.useFactory,
        useClass: option.useClass,
        useExisting: option.useExisting,
        inject: option.inject
    }));
}
