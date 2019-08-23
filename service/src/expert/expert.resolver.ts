import { Inject } from '@nestjs/common';
import { CONTEXT, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { BasePaginate, BaseResolver } from '../core';
import { Expert } from '../database';

@ObjectType()
export class ExpertPaginate extends BasePaginate(Expert) { }

@Resolver(of => Expert)
export class ExpertResolver extends BaseResolver(Expert, ExpertPaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'expert'); }
}