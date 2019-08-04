import { Inject, UseGuards } from "@nestjs/common";
import { CONTEXT } from "@nestjs/graphql";
import { ObjectType, Resolver } from "type-graphql";
import { GqlJwtAuthGuard } from "../auth";
import { BasePaginate, BaseTreeResolver } from "../core";
import { Amount } from "../database";

@ObjectType()
export class AmountPaginate extends BasePaginate(Amount) { }

@Resolver(of => Amount)
@UseGuards(GqlJwtAuthGuard)
export class AmountResolver extends BaseTreeResolver(Amount, AmountPaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'amount') }
}