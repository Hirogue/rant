import { Inject } from '@nestjs/common';
import { CONTEXT, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { BasePaginate, BaseResolver } from '../core';
import { ApplyCapital } from '../database';

@ObjectType()
export class ApplyCapitalPaginate extends BasePaginate(ApplyCapital) { }

@Resolver(of => ApplyCapital)
export class ApplyCapitalResolver extends BaseResolver(ApplyCapital, ApplyCapitalPaginate) {
    constructor(
        @Inject(CONTEXT) context
    ) {
        super(context, 'apply-capital');
    }
}