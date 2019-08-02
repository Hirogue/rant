import { Inject, UseGuards } from "@nestjs/common";
import { CONTEXT, Query, Args, Mutation } from "@nestjs/graphql";
import { Resolver, ObjectType } from "type-graphql";
import { GqlJwtAuthGuard } from "../auth";
import { BaseResolver, BasePaginate } from "../core";
import { Area } from "../database";

const API_URL = 'area';

@ObjectType()
export class AreaPaginate extends BasePaginate(Area) { }

@Resolver(of => Area)
@UseGuards(GqlJwtAuthGuard)
export class AreaResolver extends BaseResolver {
    constructor(@Inject(CONTEXT) context) { super(context) }

    @Query(returns => [Area])
    async areaTrees() {
        return await this.api.findTrees(API_URL);
    }

    @Query(returns => Area)
    async area(@Args('id') id: string, @Args('queryString') queryString: string) {
        return await this.api.findOne(API_URL, id, queryString);
    }

    @Mutation(returns => Boolean)
    async deleteArea(@Args('ids') ids: string) {
        return !!await this.api.remove(API_URL, ids);
    }

    @Mutation(returns => Area)
    async updateArea(@Args('id') id: string, @Args('data') data: Area) {
        return await this.api.update(API_URL, id, data);
    }

    @Mutation(returns => Area)
    async createArea(@Args('data') data: Area) {
        return await this.api.create(API_URL, data);
    }
}