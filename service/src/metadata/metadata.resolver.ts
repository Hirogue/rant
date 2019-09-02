import { Inject } from "@nestjs/common";
import { CONTEXT, Query, Args } from "@nestjs/graphql";
import { ObjectType, Resolver } from "type-graphql";
import { BasePaginate, BaseTreeResolver } from "../core";
import { Metadata } from "../database";
import { MetadataService } from "./metadata.service";

@ObjectType()
export class MetadataPaginate extends BasePaginate(Metadata) { }

@Resolver(of => Metadata)
export class MetadataResolver extends BaseTreeResolver(Metadata, MetadataPaginate) {
    constructor(
        private readonly service: MetadataService,
        @Inject(CONTEXT) context
    ) {
        super(context, 'metadata')
    }

    @Query(returns => [Metadata])
    async findRootsAndChildren() {
        return await this.service.findRootsAndChildren();
    }
}