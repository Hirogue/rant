import { Provider } from '@nestjs/common';
import * as algoliasearch from 'algoliasearch';
import { ALGOLIA_CLIENT, ALGOLIA_MODULE_OPTIONS } from './search.constants';
import { AlgoliaModuleOptions } from './search.interfaces';

export const createAlgoliaClient = (): Provider => ({
    provide: ALGOLIA_CLIENT,
    useFactory: (options: AlgoliaModuleOptions): algoliasearch.Client => {
        if (!options.applicationId || !options.apiKey) return null;
        return algoliasearch(options.applicationId, options.apiKey, options.clientOptions);
    },
    inject: [ALGOLIA_MODULE_OPTIONS]
});
