import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ALGOLIA_MODULE_OPTIONS } from './search.constants';
import { AlgoliaModuleAsyncOptions, AlgoliaModuleOptions, AlgoliaOptionsFactory } from './search.interfaces';
import { createAlgoliaClient } from './search.providers';
import { SearchService } from './search.service';

@Module({
    providers: [SearchService],
    exports: [SearchService]
})
export class SearchModule {
    static register(options: AlgoliaModuleOptions): DynamicModule {
        return {
            module: SearchModule,
            providers: [createAlgoliaClient(), { provide: ALGOLIA_MODULE_OPTIONS, useValue: options }]
        };
    }

    static registerAsync(options: AlgoliaModuleAsyncOptions): DynamicModule {
        return {
            module: SearchModule,
            imports: options.imports || [],
            providers: [createAlgoliaClient(), ...this.createAsyncProviders(options)]
        };
    }

    private static createAsyncProviders(options: AlgoliaModuleAsyncOptions): Provider[] {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }

        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass
            }
        ];
    }

    private static createAsyncOptionsProvider(options: AlgoliaModuleAsyncOptions): Provider {
        if (options.useFactory) {
            return {
                provide: ALGOLIA_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || []
            };
        }

        return {
            provide: ALGOLIA_MODULE_OPTIONS,
            useFactory: async (optionsFactory: AlgoliaOptionsFactory) => await optionsFactory.createAlgoliaOptions(),
            inject: [options.useExisting || options.useClass]
        };
    }
}
