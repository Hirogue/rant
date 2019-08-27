import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core';
import { Project, User } from '../database';
import { FlowEventEnum, FlowIdEnum, WorkflowService } from '../workflow';

@Injectable()
export class ProjectService extends BaseService<Project> {
    constructor(
        private readonly wf: WorkflowService,
        @InjectRepository(Project)
        protected readonly repo: Repository<Project>
    ) {
        super(repo);
    }

    async publish(project: Project, currentUser: User) {

        project.creator = currentUser;

        await this.wf.start(FlowIdEnum.PUBLISH_PROJECT, project);
        return true;
    }

    async approval(project: Project) {

        await this.wf.publish(
            FlowEventEnum.APPROVAL_PROJECT,
            `${FlowEventEnum.APPROVAL_PROJECT}-${project.id}`,
            project
        );
        return true;
    }
}
