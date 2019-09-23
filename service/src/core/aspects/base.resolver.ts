import { Args, Mutation, Query } from '@nestjs/graphql';
import { camelCase } from 'lodash';
import { ClassType } from 'type-graphql';
import { BaseDataSource } from './base.datasource';

export function BaseResolver<TEntity, TPaginate>(
  TEntityClass: ClassType<TEntity>,
  TPaginateClass: ClassType<TPaginate>,
): any {
  abstract class Resolver<TEntity> {
    protected readonly api: BaseDataSource;

    constructor(protected readonly context, protected readonly root: string) {
      this.api = context.dataSources.api;
    }

    @Query(returns => TPaginateClass, {
      name: 'query' + TEntityClass.name,
      description: `Retrieve many ${TEntityClass.name}`,
    })
    async query(@Args('queryString') queryString: string) {
      return await this.api.find(this.root, queryString);
    }

    @Query(returns => TPaginateClass, {
      name: 'search' + TEntityClass.name,
      description: `Retrieve many ${TEntityClass.name}`,
    })
    async search(@Args('queryString') queryString: string) {
      return await this.api.search(this.root, queryString);
    }

    @Query(returns => TEntityClass, {
      name: camelCase(TEntityClass.name),
      description: `Retrieve one ${TEntityClass.name}`,
    })
    async find(
      @Args('id') id: string,
      @Args('queryString') queryString: string,
    ) {
      return await this.api.findOne(this.root, id, queryString);
    }

    @Mutation(returns => Boolean, {
      name: 'delete' + TEntityClass.name,
      description: `Delete many ${TEntityClass.name}`,
    })
    async delete(@Args('ids') ids: string) {
      return !!(await this.api.remove(this.root, ids));
    }

    @Mutation(returns => TEntityClass, {
      name: 'update' + TEntityClass.name,
      description: `Update one ${TEntityClass.name}`,
    })
    async update(
      @Args('id') id: string,
      @Args({ name: 'data', type: () => TEntityClass }) data: TEntity,
    ) {
      return await this.api.update(this.root, id, data);
    }

    @Mutation(returns => TEntityClass, {
      name: 'create' + TEntityClass.name,
      description: `Create one ${TEntityClass.name}`,
    })
    async create(
      @Args({ name: 'data', type: () => TEntityClass }) data: TEntity,
    ) {
      return await this.api.create(this.root, data);
    }

    @Mutation(returns => Boolean, {
      name: 'bulk' + TEntityClass.name,
      description: `Create many ${TEntityClass.name}`,
    })
    async bulk(
      @Args({ name: 'data', type: () => [TEntityClass] }) data: TEntity[],
    ) {
      return await this.api.bulk(this.root, data);
    }
  }

  return Resolver;
}
