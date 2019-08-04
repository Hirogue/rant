import { Inject, UseGuards } from "@nestjs/common";
import { CONTEXT } from "@nestjs/graphql";
import { ObjectType, Resolver } from "type-graphql";
import { GqlJwtAuthGuard } from "../auth";
import { BasePaginate, BaseTreeResolver } from "../core";
import { CapitalType } from "../database";

@ObjectType()
export class CapitalTypePaginate extends BasePaginate(CapitalType) { }

@Resolver(of => CapitalType)
@UseGuards(GqlJwtAuthGuard)
export class CapitalTypeResolver extends BaseTreeResolver(CapitalType, CapitalTypePaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'capital-type') }
}