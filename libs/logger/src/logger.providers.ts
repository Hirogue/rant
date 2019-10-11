import { Provider } from '@nestjs/common';
import * as _ from 'lodash';
import * as path from 'path';
import * as StackTrace from 'stacktrace-js';
import { createLogger, Logger, LoggerOptions } from 'winston';
import { LOGGER_MODULE_NEST_PROVIDER, LOGGER_MODULE_OPTIONS, LOGGER_MODULE_PROVIDER } from './logger.constants';
import { LoggerModuleAsyncOptions, LoggerModuleOptions } from './logger.interfaces';

class WinstionLogger {
    constructor(private readonly logger: Logger) {}

    public info(message: any, context?: string) {
        return this.logger.info(message, this.getStackTrace(context));
    }

    public error(message: any, trace?: string, context?: string): any {
        return this.logger.error(message, {
            ...this.getStackTrace(context),
            trace
        });
    }

    public warn(message: any, context?: string): any {
        return this.logger.warn(message, this.getStackTrace(context));
    }

    public debug?(message: any, context?: string): any {
        return this.logger.debug(message, this.getStackTrace(context));
    }

    public verbose?(message: any, context?: string): any {
        return this.logger.verbose(message, this.getStackTrace(context));
    }

    private getStackTrace(context?: string, deep: number = 2) {
        const stackList = StackTrace.getSync();
        const stackInfo = stackList[deep];

        const fileName = stackInfo.fileName;

        const extnameLength = path.extname(fileName).length;
        let basename = path.basename(fileName);
        basename = basename.substr(0, basename.length - extnameLength);

        context = context || _.upperFirst(_.camelCase(basename));

        return { ...stackInfo, context, fileName };
    }
}

export function createProviders(loggerOpts: LoggerModuleOptions): Provider[] {
    return [
        {
            provide: LOGGER_MODULE_PROVIDER,
            useFactory: () => createLogger(loggerOpts)
        },
        {
            provide: LOGGER_MODULE_NEST_PROVIDER,
            useFactory: (logger: Logger) => {
                return new WinstionLogger(logger);
            },
            inject: [LOGGER_MODULE_PROVIDER]
        }
    ];
}

export function createAsyncProviders(options: LoggerModuleAsyncOptions): Provider[] {
    return [
        {
            provide: LOGGER_MODULE_OPTIONS,
            useFactory: options.useFactory,
            inject: options.inject || []
        },
        {
            provide: LOGGER_MODULE_PROVIDER,
            useFactory: (loggerOpts: LoggerOptions) => createLogger(loggerOpts),
            inject: [LOGGER_MODULE_OPTIONS]
        },
        {
            provide: LOGGER_MODULE_NEST_PROVIDER,
            useFactory: (logger: Logger) => {
                return new WinstionLogger(logger);
            },
            inject: [LOGGER_MODULE_PROVIDER]
        }
    ];
}
