import { Inject } from "@nestjs/common";
import { CONTEXT } from "@nestjs/graphql";
import { ObjectType, Resolver } from "type-graphql";
import { BasePaginate, BaseTreeResolver } from "../core";
import { DocumentCategory } from "../database";

@ObjectType()
export class DocumentCategoryPaginate extends BasePaginate(DocumentCategory) { }

@Resolver(of => DocumentCategory)
export class DocumentCategoryResolver extends BaseTreeResolver(DocumentCategory, DocumentCategoryPaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'document/category') }
}