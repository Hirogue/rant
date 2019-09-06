import { Inject } from '@nestjs/common';
import { CONTEXT, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { BasePaginate, BaseResolver } from '../core';
import { ApplyProject } from '../database';

@ObjectType()
export class ApplyProjectPaginate extends BasePaginate(ApplyProject) { }

@Resolver(of => ApplyProject)
export class ApplyProjectResolver extends BaseResolver(ApplyProject, ApplyProjectPaginate) {
    constructor(
        @Inject(CONTEXT) context
    ) {
        super(context, 'apply-project');
    }
}