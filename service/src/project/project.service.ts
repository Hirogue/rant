import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction, TransactionRepository } from 'typeorm';
import { BaseService, LogTypeEnum, ProjectStatusEnum } from '../core';
import { Log, Org, Project, User } from '../database';

@Injectable()
export class ProjectService extends BaseService<Project> {

    constructor(
        @InjectRepository(Project)
        protected readonly repo: Repository<Project>
    ) {
        super(repo);
    }

    @Transaction()
    async publish(
        project: Project,
        currentUser: User,
        @TransactionRepository(Log) logRepo?: Repository<Log>,
        @TransactionRepository(Project) projectRepo?: Repository<Project>
    ) {
        project.creator = currentUser;
        project.contact = currentUser.realname;
        project.phone = currentUser.phone;
        project.company = currentUser.company;
        project.status = ProjectStatusEnum.PENDING;

        const target = await projectRepo.save(project);

        const log = new Log();
        log.info = `${currentUser.realname} 发布项目`;
        log.own = currentUser;
        log.target = target.id;
        log.type = LogTypeEnum.PROJECT;
        log.status = project.status;

        await logRepo.save(log);

        return true;
    }

    @Transaction()
    async approval(
        project: Project,
        user: User,
        @TransactionRepository(Log) logRepo?: Repository<Log>,
        @TransactionRepository(Org) orgRepo?: Repository<Org>,
        @TransactionRepository(User) userRepo?: Repository<User>,
        @TransactionRepository(Project) projectRepo?: Repository<Project>,
    ) {
        const log = new Log();

        const target = await projectRepo.findOne(project.id);
        target.status = project.status;
        target.reason = project.reason;

        if (ProjectStatusEnum.CHECKED === target.status) {
            log.info = `${user.realname} 审核项目通过`;
        }

        if (ProjectStatusEnum.WAITING === target.status) {
            if (project.org) {
                const org = await orgRepo.findOne(project.org.id);
                target.org = project.org;

                log.info = `${user.realname} 将项目分配给 "${org.title}"`;
            }
        }

        if (ProjectStatusEnum.FOLLOWING === target.status) {
            if (project.own) {

                const own = await userRepo.findOne(project.own.id);
                target.own = own;

                log.info = `${user.realname} 将项目分配给业务员 "${own.realname}"`;
            }

            if (target.reason) {
                log.info = `${user.realname} 跟进："${target.reason}"`;
            }
        }

        if (ProjectStatusEnum.REJECTED === target.status) {
            log.info = `${user.realname} 驳回项目，理由："${target.reason}"`;
        }

        if (ProjectStatusEnum.FINISHED === target.status) {
            log.info = `${user.realname} 完成项目，总结："${target.reason}"`;
        }

        if (ProjectStatusEnum.CANCELLED === target.status) {
            log.info = `${user.realname} 作废项目，理由："${project.reason}"`;
        }

        log.own = user;
        log.target = target.id;
        log.status = target.status;
        log.type = LogTypeEnum.PROJECT;

        await logRepo.save(log);
        await projectRepo.save(project);

        return true;
    }
}
