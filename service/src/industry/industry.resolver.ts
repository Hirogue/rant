import { Inject, UseGuards } from "@nestjs/common";
import { CONTEXT } from "@nestjs/graphql";
import { ObjectType, Resolver } from "type-graphql";
import { GqlJwtAuthGuard } from "../auth";
import { BasePaginate, BaseTreeResolver } from "../core";
import { Industry } from "../database";

@ObjectType()
export class IndustryPaginate extends BasePaginate(Industry) { }

@Resolver(of => Industry)
@UseGuards(GqlJwtAuthGuard)
export class IndustryResolver extends BaseTreeResolver(Industry, IndustryPaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'industry') }
}