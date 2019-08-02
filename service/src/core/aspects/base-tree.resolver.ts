import { BaseDataSource } from "./base.datasource";
import { ClassType } from "type-graphql";
import { camelCase } from "lodash";
import { Args, Mutation, Query } from "@nestjs/graphql";

export function BaseTreeResolver<TEntity, TPaginate>(
    TEntityClass: ClassType<TEntity>, TPaginateClass: ClassType<TPaginate>
): any {

    abstract class Resolver<TEntity> {
        protected readonly api: BaseDataSource;

        constructor(
            protected readonly context,
            protected readonly root: string
        ) {
            this.api = context.dataSources.api;
            this.root = root;
        }

        @Query(returns => [TEntityClass], { name: camelCase(TEntityClass.name) + 'Trees' })
        async trees() {
            return await this.api.findTrees(this.root);
        }

        @Query(returns => TPaginateClass, { name: 'query' + TEntityClass.name })
        async query(@Args('queryString') queryString: string) {
            return await this.api.find(this.root, queryString);
        }

        @Query(returns => TEntityClass, { name: camelCase(TEntityClass.name) })
        async find(@Args('id') id: string, @Args('queryString') queryString: string) {
            return await this.api.findOne(this.root, id, queryString);
        }

        @Mutation(returns => Boolean, { name: 'delete' + TEntityClass.name })
        async delete(@Args('ids') ids: string) {
            return !!await this.api.remove(this.root, ids);
        }

        @Mutation(returns => TEntityClass, { name: 'update' + TEntityClass.name })
        async update(@Args('id') id: string, @Args({ name: 'data', type: () => TEntityClass }) data: TEntity) {
            return await this.api.update(this.root, id, data);
        }

        @Mutation(returns => TEntityClass, { name: 'create' + TEntityClass.name })
        async create(@Args({ name: 'data', type: () => TEntityClass }) data: TEntity) {
            return await this.api.create(this.root, data);
        }
    }

    return Resolver;
}
