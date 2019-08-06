import { Args, Query } from "@nestjs/graphql";
import { camelCase } from "lodash";
import { ClassType } from "type-graphql";
import { BaseResolver } from "./base.resolver";

export function BaseTreeResolver<TEntity, TPaginate>(
    TEntityClass: ClassType<TEntity>, TPaginateClass: ClassType<TPaginate>
): any {
    abstract class BaseTreeResolver extends BaseResolver(TEntityClass, TPaginateClass) {

        @Query(returns => [TEntityClass], { name: camelCase(TEntityClass.name) + 'Trees' })
        async trees() {
            return await this.api.findTrees(this.root);
        }

        @Query(returns => [TEntityClass], { name: camelCase(TEntityClass.name) + 'DescendantsTree' })
        async descendantsTree(@Args('root') root: string) {
            return await this.api.findDescendantsTree(this.root, root);
        }
    }

    return BaseTreeResolver;
}