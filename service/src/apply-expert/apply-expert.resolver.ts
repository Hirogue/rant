import { Inject, UseGuards } from '@nestjs/common';
import { CONTEXT, Resolver, Mutation, Args } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { BasePaginate, BaseResolver, Me } from '../core';
import { ApplyExpert, User } from '../database';
import { GqlJwtAuthGuard } from '../auth';
import { ApplyExpertService } from './apply-expert.service';

@ObjectType()
export class ApplyExpertPaginate extends BasePaginate(ApplyExpert) { }

@Resolver(of => ApplyExpert)
export class ApplyExpertResolver extends BaseResolver(ApplyExpert, ApplyExpertPaginate) {
    constructor(
        @Inject(CONTEXT) context,
        private readonly service: ApplyExpertService
    ) {
        super(context, 'apply-expert');
    }

    @Mutation(returns => Boolean, { description: 'Approval project' })
    @UseGuards(GqlJwtAuthGuard)
    async approvalApplyExpert(@Args('data') data: ApplyExpert, @Me() user: User) {
        return await this.service.approval(data, user);
    }
}