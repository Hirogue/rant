import { Inject, UseGuards } from "@nestjs/common";
import { CONTEXT } from "@nestjs/graphql";
import { ObjectType, Resolver } from "type-graphql";
import { GqlJwtAuthGuard } from "../auth";
import { BasePaginate, BaseTreeResolver } from "../core";
import { Authority } from "../database";

@ObjectType()
export class AuthorityPaginate extends BasePaginate(Authority) { }

@Resolver(of => Authority)
@UseGuards(GqlJwtAuthGuard)
export class AuthorityResolver extends BaseTreeResolver(Authority, AuthorityPaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'authority') }
}