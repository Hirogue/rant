import { Inject } from "@nestjs/common";
import { CONTEXT } from "@nestjs/graphql";
import { ObjectType, Resolver } from "type-graphql";
import { BasePaginate, BaseTreeResolver } from "../core";
import { ProviderCategory } from "../database";

@ObjectType()
export class ProviderCategoryPaginate extends BasePaginate(ProviderCategory) { }

@Resolver(of => ProviderCategory)
export class ProviderCategoryResolver extends BaseTreeResolver(ProviderCategory, ProviderCategoryPaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'provider/category') }
}