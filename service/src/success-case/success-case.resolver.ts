import { Inject } from '@nestjs/common';
import { CONTEXT, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { BasePaginate, BaseResolver } from '../core';
import { SuccessCase } from '../database';

@ObjectType()
export class SuccessCasePaginate extends BasePaginate(SuccessCase) { }

@Resolver(of => SuccessCase)
export class SuccessCaseResolver extends BaseResolver(SuccessCase, SuccessCasePaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'success-case'); }
}