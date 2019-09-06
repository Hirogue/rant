import { Inject } from '@nestjs/common';
import { CONTEXT, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { BasePaginate, BaseResolver } from '../core';
import { ApplyProvider } from '../database';

@ObjectType()
export class ApplyProviderPaginate extends BasePaginate(ApplyProvider) { }

@Resolver(of => ApplyProvider)
export class ApplyProviderResolver extends BaseResolver(ApplyProvider, ApplyProviderPaginate) {
    constructor(
        @Inject(CONTEXT) context
    ) {
        super(context, 'apply-provider');
    }
}