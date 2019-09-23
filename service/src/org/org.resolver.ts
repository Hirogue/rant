import { Inject, UseGuards } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { ObjectType, Resolver } from 'type-graphql';
import { GqlJwtAuthGuard } from '../auth';
import { BasePaginate, BaseTreeResolver } from '../core';
import { Org } from '../database';

@ObjectType()
export class OrgPaginate extends BasePaginate(Org) {}

@Resolver(of => Org)
@UseGuards(GqlJwtAuthGuard)
export class OrgResolver extends BaseTreeResolver(Org, OrgPaginate) {
  constructor(@Inject(CONTEXT) context) {
    super(context, 'org');
  }
}
