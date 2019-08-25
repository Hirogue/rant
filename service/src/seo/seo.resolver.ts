import { Inject } from '@nestjs/common';
import { CONTEXT, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { BasePaginate, BaseResolver } from '../core';
import { Seo } from '../database';

@ObjectType()
export class SeoPaginate extends BasePaginate(Seo) { }

@Resolver(of => Seo)
export class SeoResolver extends BaseResolver(Seo, SeoPaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'seo'); }
}