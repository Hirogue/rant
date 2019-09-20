import { Inject } from '@nestjs/common';
import { CONTEXT, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { BasePaginate, BaseResolver } from '../core';
import { Link } from '../database';

@ObjectType()
export class LinkPaginate extends BasePaginate(Link) { }

@Resolver(of => Link)
export class LinkResolver extends BaseResolver(Link, LinkPaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'link'); }
}