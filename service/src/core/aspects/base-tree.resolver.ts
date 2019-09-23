import { Args, Query } from '@nestjs/graphql';
import { camelCase } from 'lodash';
import { ClassType } from 'type-graphql';
import { BaseResolver } from './base.resolver';

export function BaseTreeResolver<TEntity, TPaginate>(
  TEntityClass: ClassType<TEntity>,
  TPaginateClass: ClassType<TPaginate>,
): any {
  abstract class BaseTreeResolver extends BaseResolver(
    TEntityClass,
    TPaginateClass,
  ) {
    @Query(returns => TEntityClass, {
      name: camelCase(TEntityClass.name) + 'Tree',
      description: `Get ${TEntityClass.name} tree`,
    })
    async tree(@Args('id') id: string) {
      return await this.api.findTree(this.root, id);
    }

    @Query(returns => [TEntityClass], {
      name: camelCase(TEntityClass.name) + 'Children',
      description: `Get all ${TEntityClass.name} children`,
    })
    async children(@Args('id') id: string) {
      return await this.api.findChildren(this.root, id);
    }

    @Query(returns => [TEntityClass], {
      name: camelCase(TEntityClass.name) + 'Trees',
      description: `Get all ${TEntityClass.name} trees`,
    })
    async trees() {
      return await this.api.findTrees(this.root);
    }

    @Query(returns => [TEntityClass], {
      name: camelCase(TEntityClass.name) + 'Roots',
      description: `Get all ${TEntityClass.name} roots`,
    })
    async roots() {
      return await this.api.findRoots(this.root);
    }

    @Query(returns => [TEntityClass], {
      name: camelCase(TEntityClass.name) + 'Descendants',
      description: `Get all ${TEntityClass.name} descendants`,
    })
    async descendants(@Args('id') id: string) {
      return await this.api.findDescendants(this.root, id);
    }

    @Query(returns => [TEntityClass], {
      name: camelCase(TEntityClass.name) + 'DescendantsTree',
      description: `Get all ${TEntityClass.name} descendants tree`,
    })
    async descendantsTree(@Args('root') root: string) {
      return await this.api.findDescendantsTree(this.root, root);
    }

    @Query(returns => [TEntityClass], {
      name: camelCase(TEntityClass.name) + 'DescendantsTrees',
      description: `Get all ${TEntityClass.name} descendants trees`,
    })
    async findDescendantsTrees(@Args('id') id: string) {
      return await this.api.findDescendantsTrees(this.root, id);
    }
  }

  return BaseTreeResolver;
}
