import { Inject, UseGuards } from "@nestjs/common";
import { Args, CONTEXT, Mutation, Query } from "@nestjs/graphql";
import { ObjectType, Resolver } from "type-graphql";
import { GqlJwtAuthGuard } from "../auth";
import { BasePaginate, BaseResolver } from "../core";
import { ArticleCategory } from "../database";

const API_URL = 'article/category';

@ObjectType()
export class ArticleCategoryPaginate extends BasePaginate(ArticleCategory) { }

@Resolver(of => ArticleCategory)
@UseGuards(GqlJwtAuthGuard)
export class ArticleCategoryResolver extends BaseResolver {
    constructor(@Inject(CONTEXT) context) { super(context) }

    @Query(returns => [ArticleCategory])
    async articleCategoryTrees() {
        return await this.api.findTrees(API_URL);
    }

    @Query(returns => ArticleCategory)
    async articleCategory(@Args('id') id: string, @Args('queryString') queryString: string) {
        return await this.api.findOne(API_URL, id, queryString);
    }

    @Mutation(returns => Boolean)
    async deleteArticleCategory(@Args('ids') ids: string) {
        return !!await this.api.remove(API_URL, ids);
    }

    @Mutation(returns => ArticleCategory)
    async updateArticleCategory(@Args('id') id: string, @Args('data') data: ArticleCategory) {
        return await this.api.update(API_URL, id, data);
    }

    @Mutation(returns => ArticleCategory)
    async createArticleCategory(@Args('data') data: ArticleCategory) {
        return await this.api.create(API_URL, data);
    }
}