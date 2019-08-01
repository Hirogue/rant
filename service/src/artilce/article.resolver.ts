import { Inject, UseGuards } from '@nestjs/common';
import { Args, CONTEXT, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard';
import { BasePaginate, BaseResolver } from '../core';
import { Article } from '../database';

const API_URL = 'article';

@ObjectType()
export class ArticlePaginate extends BasePaginate(Article) { }

@Resolver(of => Article)
@UseGuards(GqlJwtAuthGuard)
export class ArticleResolver extends BaseResolver {

    constructor(@Inject(CONTEXT) context) { super(context); }

    @Query(returns => ArticlePaginate)
    async articles(@Args('queryString') queryString: string) {
        return await this.api.find(API_URL, queryString);
    }

    @Query(returns => Article)
    async article(@Args('id') id: string, @Args('queryString') queryString: string) {
        return await this.api.findOne(API_URL, id, queryString);
    }

    @Mutation(returns => Boolean)
    async deleteArticle(@Args('ids') ids: string) {
        return !!await this.api.remove(API_URL, ids);
    }

    @Mutation(returns => Boolean)
    async updateArticle(@Args('id') id: string, @Args('data') data: Article) {
        return !!await this.api.update(API_URL, id, data);
    }

    @Mutation(returns => Article)
    async createArticle(@Args('data') data: Article) {
        return await this.api.create(API_URL, data);
    }
}