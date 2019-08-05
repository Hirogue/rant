import { Inject } from '@nestjs/common';
import { CONTEXT, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { BasePaginate, BaseResolver } from '../core';
import { Project } from '../database';

@ObjectType()
export class ProjectPaginate extends BasePaginate(Project) { }

@Resolver(of => Project)
export class ProjectResolver extends BaseResolver(Project, ProjectPaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'project'); }
}