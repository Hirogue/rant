import { DynamicModule, Global, Module } from '@nestjs/common';
import { LoggerModuleAsyncOptions, LoggerModuleOptions } from './logger.interfaces';
import { LoggerMiddleware } from './logger.middleware';
import { createAsyncProviders, createProviders } from './logger.providers';
import { LoggerService } from './logger.service';

@Global()
@Module({
    providers: [LoggerService, LoggerMiddleware],
    exports: [LoggerService, LoggerMiddleware]
})
export class LoggerModule {
    public static forRoot(options: LoggerModuleOptions): DynamicModule {
        const providers = createProviders(options);

        return {
            module: LoggerModule,
            providers: providers,
            exports: providers
        };
    }

    public static forRootAsync(options: LoggerModuleAsyncOptions): DynamicModule {
        const providers = createAsyncProviders(options);

        return {
            module: LoggerModule,
            imports: options.imports,
            providers: providers,
            exports: providers
        };
    }
}
