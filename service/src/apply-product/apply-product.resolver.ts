import { Inject, UseGuards } from '@nestjs/common';
import { CONTEXT, Resolver, Mutation, Args } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { BasePaginate, BaseResolver, Me } from '../core';
import { ApplyProduct, User } from '../database';
import { GqlJwtAuthGuard } from '../auth';
import { ApplyProductService } from './apply-product.service';

@ObjectType()
export class ApplyProductPaginate extends BasePaginate(ApplyProduct) { }

@Resolver(of => ApplyProduct)
export class ApplyProductResolver extends BaseResolver(ApplyProduct, ApplyProductPaginate) {
    constructor(
        @Inject(CONTEXT) context,
        private readonly service: ApplyProductService
    ) {
        super(context, 'apply-product');
    }

    @Mutation(returns => Boolean, { description: 'Approval product' })
    @UseGuards(GqlJwtAuthGuard)
    async approvalApplyProduct(@Args('data') data: ApplyProduct, @Me() user: User) {
        return await this.service.approval(data, user);
    }
}