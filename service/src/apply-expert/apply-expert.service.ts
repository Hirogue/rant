import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction, TransactionRepository } from 'typeorm';
import { BaseService, ProjectStatusEnum, LogTypeEnum } from '../core';
import { ApplyExpert, User, Org, Log } from '../database';

@Injectable()
export class ApplyExpertService extends BaseService<ApplyExpert> {
    constructor(@InjectRepository(ApplyExpert) protected readonly repo: Repository<ApplyExpert>) {
        super(repo);
    }

    @Transaction()
    async approval(
        applyExpert: ApplyExpert,
        user: User,
        @TransactionRepository(Log) logRepo?: Repository<Log>,
        @TransactionRepository(Org) orgRepo?: Repository<Org>,
        @TransactionRepository(User) userRepo?: Repository<User>,
        @TransactionRepository(ApplyExpert) applyExpertRepo?: Repository<ApplyExpert>,
    ) {
        const log = new Log();

        const target = await applyExpertRepo.findOne(applyExpert.id);
        target.status = applyExpert.status;
        target.reason = applyExpert.reason;

        if (ProjectStatusEnum.CHECKED === target.status) {
            log.info = `${user.realname} 审核约见通过`;
        }

        if (ProjectStatusEnum.WAITING === target.status) {
            if (applyExpert.org) {
                const org = await orgRepo.findOne(applyExpert.org.id);
                target.org = applyExpert.org;

                log.info = `${user.realname} 将约见分配给 "${org.title}"`;
            }
        }

        if (ProjectStatusEnum.FOLLOWING === target.status) {
            if (applyExpert.own) {

                const own = await userRepo.findOne(applyExpert.own.id);
                target.own = own;

                log.info = `${user.realname} 将约见分配给业务员 "${own.realname}"`;
            }

            if (target.reason) {
                log.info = `${user.realname} 跟进："${target.reason}"`;
            }
        }

        if (ProjectStatusEnum.REJECTED === target.status) {
            log.info = `${user.realname} 驳回约见，理由："${target.reason}"`;
        }

        if (ProjectStatusEnum.FINISHED === target.status) {
            log.info = `${user.realname} 完成约见`;
        }

        if (ProjectStatusEnum.CANCELLED === target.status) {
            log.info = `${user.realname} 作废约见，理由："${applyExpert.reason}"`;
        }

        log.own = user;
        log.target = target.id;
        log.status = target.status;
        log.type = LogTypeEnum.EXPERT;

        await logRepo.save(log);
        await applyExpertRepo.save(applyExpert);

        return true;
    }
}
