import { Inject } from "@nestjs/common";
import { CONTEXT } from "@nestjs/graphql";
import { ObjectType, Resolver } from "type-graphql";
import { BasePaginate, BaseTreeResolver } from "../core";
import { Metadata } from "../database";

@ObjectType()
export class MetadataPaginate extends BasePaginate(Metadata) { }

@Resolver(of => Metadata)
export class MetadataResolver extends BaseTreeResolver(Metadata, MetadataPaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'metadata') }
}