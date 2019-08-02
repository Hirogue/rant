import { Inject, UseGuards } from "@nestjs/common";
import { CONTEXT } from "@nestjs/graphql";
import { ObjectType, Resolver } from "type-graphql";
import { GqlJwtAuthGuard } from "../auth";
import { BasePaginate, BaseTreeResolver } from "../core";
import { ProductCategory } from "../database";

@ObjectType()
export class ProductCategoryPaginate extends BasePaginate(ProductCategory) { }

@Resolver(of => ProductCategory)
@UseGuards(GqlJwtAuthGuard)
export class ProductCategoryResolver extends BaseTreeResolver(ProductCategory, ProductCategoryPaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'product/category') }
}