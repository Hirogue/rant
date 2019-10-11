import { Inject, Injectable, LoggerService as ILoggerService } from '@nestjs/common';
import { LOGGER_MODULE_NEST_PROVIDER } from './logger.constants';

@Injectable()
export class LoggerService implements ILoggerService {
    constructor(
        @Inject(LOGGER_MODULE_NEST_PROVIDER)
        private readonly logger
    ) {}

    public log(message: any, context?: string): any {
        return this.logger.info(message, context);
    }

    public error(message: any, trace?: string, context?: string): any {
        return this.logger.error(message, trace, context);
    }

    public warn(message: any, context?: string): any {
        return this.logger.warn(message, context);
    }

    public debug?(message: any, context?: string): any {
        return this.logger.debug(message, context);
    }

    public verbose?(message: any, context?: string): any {
        return this.logger.verbose(message, context);
    }
}
