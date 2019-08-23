import { Inject } from '@nestjs/common';
import { CONTEXT, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { BasePaginate, BaseResolver } from '../core';
import { Document } from '../database';

@ObjectType()
export class DocumentPaginate extends BasePaginate(Document) { }

@Resolver(of => Document)
export class DocumentResolver extends BaseResolver(Document, DocumentPaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'document'); }
}