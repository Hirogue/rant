import { Inject } from '@nestjs/common';
import { CONTEXT, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { BasePaginate, BaseResolver } from '../core';
import { Capital } from '../database';

@ObjectType()
export class CapitalPaginate extends BasePaginate(Capital) { }

@Resolver(of => Capital)
export class CapitalResolver extends BaseResolver(Capital, CapitalPaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'capital'); }
}