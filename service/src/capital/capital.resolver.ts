import { Inject, UseGuards } from '@nestjs/common';
import { Args, CONTEXT, Mutation, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { GqlJwtAuthGuard } from '../auth';
import { BasePaginate, BaseResolver, Me } from '../core';
import { Capital, User } from '../database';
import { CapitalService } from './capital.service';

@ObjectType()
export class CapitalPaginate extends BasePaginate(Capital) { }

@Resolver(of => Capital)
export class CapitalResolver extends BaseResolver(Capital, CapitalPaginate) {
    constructor(
        @Inject(CONTEXT) context,
        private readonly capitalService: CapitalService
    ) { super(context, 'capital'); }

    @Mutation(returns => Boolean, { description: 'Publish capital' })
    @UseGuards(GqlJwtAuthGuard)
    async publishCapital(@Args('data') data: Capital, @Me() me: User) {
        return await this.capitalService.publish(data, me);
    }

    @Mutation(returns => Boolean, { description: 'Approval capital' })
    @UseGuards(GqlJwtAuthGuard)
    async approvalCapital(@Args('data') data: Capital) {
        return await this.capitalService.approval(data);
    }
}