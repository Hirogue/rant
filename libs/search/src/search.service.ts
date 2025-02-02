import { Inject, Injectable } from '@nestjs/common';
import {
    Action,
    AddApiKeyTask,
    ApiKey,
    ApiKeyOptions,
    BatchTask,
    Client,
    DeleteApiKeyTask,
    Index,
    Log,
    LogsOptions,
    MultiResponse,
    QueryParameters,
    SearchForFacetValues,
    SecuredApiOptions,
    Task,
    UpdateApiKeyTask,
    UpdateIndexTask
} from 'algoliasearch';
import { ALGOLIA_CLIENT } from './search.constants';

@Injectable()
export class SearchService {
    constructor(@Inject(ALGOLIA_CLIENT) private readonly algoliaClient: Client) {}

    /**
     * Initialization of the index
     * https://github.com/algolia/algoliasearch-client-js#init-index---initindex
     */
    initIndex(indexName: string): Index {
        return this.algoliaClient.initIndex(indexName);
    }

    /**
     * Query on multiple index
     * https://github.com/algolia/algoliasearch-client-js#multiple-queries---multiplequeries
     */
    search<T = any>(
        queries: {
            indexName: string;
            query: string;
            params: QueryParameters;
        }[]
    ): Promise<MultiResponse<T>> {
        return this.algoliaClient.search(queries);
    }

    /**
     * Query for facet values of a specific facet
     */
    searchForFacetValues(
        queries: [{ indexName: string; params: SearchForFacetValues.Parameters }]
    ): Promise<SearchForFacetValues.Response[]> {
        return this.algoliaClient.searchForFacetValues(queries);
    }

    /**
     * clear browser cache
     * https://github.com/algolia/algoliasearch-client-js#cache
     */
    clearCache(): void {
        this.algoliaClient.clearCache();
    }

    /**
     * kill alive connections
     * https://github.com/algolia/algoliasearch-client-js#keep-alive
     */
    destroy(): void {
        this.algoliaClient.destroy();
    }

    /**
     * Add a header to be sent with all upcoming requests
     */
    setExtraHeader(name: string, value: string): void {
        this.algoliaClient.setExtraHeader(name, value);
    }

    /**
     * Get the value of an extra header
     */
    getExtraHeader(name: string): string {
        return this.algoliaClient.getExtraHeader(name);
    }

    /**
     * Remove an extra header for all upcoming requests
     */
    unsetExtraHeader(name: string): void {
        this.algoliaClient.unsetExtraHeader(name);
    }

    /**
     * List all your indices along with their associated information (number of entries, disk size, etc.)
     * https://github.com/algolia/algoliasearch-client-js#list-indices---listindexes
     */
    listIndexes(): Promise<any> {
        return this.algoliaClient.listIndexes();
    }

    /**
     * Delete a specific index
     * https://github.com/algolia/algoliasearch-client-js#delete-index---deleteindex
     */
    deleteIndex(name: string): Promise<Task> {
        return this.algoliaClient.deleteIndex(name);
    }

    /**
     * Copy settings of an index from a specific index to a new one
     * https://github.com/algolia/algoliasearch-client-js#copy-index---copyindex
     */
    copyIndex(from: string, to: string, scope?: ('settings' | 'synonyms' | 'rules')[]): Promise<UpdateIndexTask> {
        return this.algoliaClient.copyIndex(from, to, scope);
    }

    /**
     * Move index to a new one (and will overwrite the original one)
     * https://github.com/algolia/algoliasearch-client-js#move-index---moveindex
     */
    moveIndex(from: string, to: string): Promise<UpdateIndexTask> {
        return this.algoliaClient.moveIndex(from, to);
    }
    /**
     * Generate a public API key
     * https://github.com/algolia/algoliasearch-client-js#generate-key---generatesecuredapikey
     */
    generateSecuredApiKey(key: string, filters: SecuredApiOptions): string {
        return this.algoliaClient.generateSecuredApiKey(key, filters);
    }

    /**
     * Perform multiple operations with one API call to reduce latency
     * https://github.com/algolia/algoliasearch-client-js#custom-batch---batch
     */
    batch(action: Action[]): Promise<BatchTask> {
        return this.algoliaClient.batch(action);
    }

    /**
     * Lists global API Keys
     * https://github.com/algolia/algoliasearch-client-js#backup--export-an-index---browse
     */
    listApiKeys(): Promise<any> {
        return this.algoliaClient.listApiKeys();
    }

    /**
     * Add global API Keys
     * https://github.com/algolia/algoliasearch-client-js#add-user-key---addapikey
     */
    addApiKey(scopes: string[], options?: ApiKeyOptions): Promise<AddApiKeyTask> {
        return this.algoliaClient.addApiKey(scopes, options);
    }

    /**
     * Update global API key
     * https://github.com/algolia/algoliasearch-client-js#update-user-key---updateapikey
     */
    updateApiKey(key: string, scopes: string[], options?: ApiKeyOptions): Promise<UpdateApiKeyTask> {
        return this.algoliaClient.updateApiKey(key, scopes, options);
    }

    /**
     * Gets the rights of a global key
     * https://github.com/algolia/algoliasearch-client-js#update-user-key---updateapikey
     */
    getApiKey(key: string): Promise<ApiKey> {
        return this.algoliaClient.getApiKey(key);
    }

    /**
     * Deletes a global key
     * https://github.com/algolia/algoliasearch-client-js#delete-user-key---deleteapikey
     */
    deleteApiKey(key: string): Promise<DeleteApiKeyTask> {
        return this.algoliaClient.deleteApiKey(key);
    }

    /**
     * Get 1000 last events
     * https://github.com/algolia/algoliasearch-client-js#get-logs---getlogs
     */
    getLogs(options: LogsOptions): Promise<{ logs: Log[] }> {
        return this.algoliaClient.getLogs(options);
    }
}
