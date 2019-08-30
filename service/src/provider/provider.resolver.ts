import { Inject } from '@nestjs/common';
import { Args, CONTEXT, Mutation, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { BasePaginate, BaseResolver } from '../core';
import { Provider } from '../database';
import { ProviderService } from './provider.service';

@ObjectType()
export class ProviderPaginate extends BasePaginate(Provider) { }

@Resolver(of => Provider)
export class ProviderResolver extends BaseResolver(Provider, ProviderPaginate) {
    constructor(
        @Inject(CONTEXT) context,
        private readonly service: ProviderService
    ) { super(context, 'provider'); }

    @Mutation(returns => Boolean, { description: 'Approval provider' })
    async approvalProvider(@Args('data') data: Provider) {
        return await this.service.approval(data);
    }
}