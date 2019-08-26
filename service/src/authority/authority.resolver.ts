import { Inject } from '@nestjs/common';
import { CONTEXT, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { BasePaginate, BaseResolver } from '../core';
import { Authority } from '../database';

@ObjectType()
export class AuthorityPaginate extends BasePaginate(Authority) { }

@Resolver(of => Authority)
export class AuthorityResolver extends BaseResolver(Authority, AuthorityPaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'authority'); }
}