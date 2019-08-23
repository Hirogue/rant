import { Inject, UseGuards } from '@nestjs/common';
import { Args, CONTEXT, Mutation, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { GqlJwtAuthGuard } from '../auth';
import { BasePaginate, BaseResolver, Me } from '../core';
import { Project, User } from '../database';
import { ProjectService } from './project.service';

@ObjectType()
export class ProjectPaginate extends BasePaginate(Project) { }

@Resolver(of => Project)
export class ProjectResolver extends BaseResolver(Project, ProjectPaginate) {
    constructor(
        @Inject(CONTEXT) context,
        private readonly projectService: ProjectService
    ) {
        super(context, 'project');
    }

    @Mutation(returns => Boolean, { description: 'Publish project' })
    @UseGuards(GqlJwtAuthGuard)
    async publishProject(@Args('data') data: Project, @Me() me: User) {
        return await this.projectService.publish(data, me);
    }

    @Mutation(returns => Boolean, { description: 'Approval project' })
    @UseGuards(GqlJwtAuthGuard)
    async approvalProject(@Args('data') data: Project) {
        return await this.projectService.approval(data);
    }
}