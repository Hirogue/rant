import { Inject } from "@nestjs/common";
import { CONTEXT } from "@nestjs/graphql";
import { ObjectType, Resolver } from "type-graphql";
import { BasePaginate, BaseTreeResolver } from "../core";
import { ArticleCategory } from "../database";

@ObjectType()
export class ArticleCategoryPaginate extends BasePaginate(ArticleCategory) { }

@Resolver(of => ArticleCategory)
export class ArticleCategoryResolver extends BaseTreeResolver(ArticleCategory, ArticleCategoryPaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'article/category') }
}