import { Inject, UseGuards } from '@nestjs/common';
import { CONTEXT, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard';
import { BasePaginate, BaseResolver } from '../core';
import { Article } from '../database';

@ObjectType()
export class ArticlePaginate extends BasePaginate(Article) { }

@Resolver(of => Article)
@UseGuards(GqlJwtAuthGuard)
export class ArticleResolver extends BaseResolver(Article, ArticlePaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'article'); }
}