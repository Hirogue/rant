import { DynamicModule, Global, Module } from '@nestjs/common';
import { LoggerModuleAsyncOptions, LoggerModuleOptions } from './logger.interfaces';
import { createProviders, createAsyncProviders } from './logger.providers';

@Global()
@Module({})
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
