import { Inject, UseGuards } from "@nestjs/common";
import { CONTEXT } from "@nestjs/graphql";
import { ObjectType, Resolver } from "type-graphql";
import { GqlJwtAuthGuard } from "../auth";
import { BasePaginate, BaseTreeResolver } from "../core";
import { Area } from "../database";

@ObjectType()
export class AreaPaginate extends BasePaginate(Area) { }

@Resolver(of => Area)
@UseGuards(GqlJwtAuthGuard)
export class AreaResolver extends BaseTreeResolver(Area, AreaPaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'area') }
}