import { Inject, UseGuards } from "@nestjs/common";
import { CONTEXT, Query, Args, Mutation } from "@nestjs/graphql";
import { Resolver, ObjectType } from "type-graphql";
import { GqlJwtAuthGuard } from "../auth";
import { BaseResolver, BasePaginate } from "../core";
import { Org } from "../database";

const API_URL = 'org';

@ObjectType()
export class OrgPaginate extends BasePaginate(Org) { }

@Resolver(of => Org)
@UseGuards(GqlJwtAuthGuard)
export class OrgResolver extends BaseResolver {
    constructor(@Inject(CONTEXT) context) { super(context) }

    @Query(returns => [Org])
    async orgTrees() {
        return await this.api.findTrees(API_URL);
    }

    @Query(returns => Org)
    async org(@Args('id') id: string, @Args('queryString') queryString: string) {
        return await this.api.findOne(API_URL, id, queryString);
    }

    @Mutation(returns => Boolean)
    async deleteOrg(@Args('ids') ids: string) {
        return !!await this.api.remove(API_URL, ids);
    }

    @Mutation(returns => Org)
    async updateOrg(@Args('id') id: string, @Args('data') data: Org) {
        return await this.api.update(API_URL, id, data);
    }

    @Mutation(returns => Org)
    async createOrg(@Args('data') data: Org) {
        return await this.api.create(API_URL, data);
    }
}