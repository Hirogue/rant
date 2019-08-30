import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction, TransactionRepository } from 'typeorm';
import { BaseService, LogTypeEnum, ProjectStatusEnum } from '../core';
import { Capital, Log, Org, User } from '../database/entities';

@Injectable()
export class CapitalService extends BaseService<Capital> {

    constructor(
        @InjectRepository(Capital)
        protected readonly repo: Repository<Capital>
    ) {
        super(repo);
    }

    @Transaction()
    async publish(
        capital: Capital,
        currentUser: User,
        @TransactionRepository(Log) logRepo?: Repository<Log>,
        @TransactionRepository(Capital) capitalRepo?: Repository<Capital>
    ) {
        capital.creator = currentUser;
        capital.status = ProjectStatusEnum.PENDING;

        const target = await capitalRepo.save(capital);

        const log = new Log();
        log.info = `${currentUser.realname} 发布资金`;
        log.own = currentUser;
        log.target = target.id;
        log.type = LogTypeEnum.PROJECT;
        log.status = capital.status;

        await logRepo.save(log);

        return true;
    }

    @Transaction()
    async approval(
        capital: Capital,
        user: User,
        @TransactionRepository(Log) logRepo?: Repository<Log>,
        @TransactionRepository(Org) orgRepo?: Repository<Org>,
        @TransactionRepository(User) userRepo?: Repository<User>,
        @TransactionRepository(Capital) capitalRepo?: Repository<Capital>,
    ) {
        const log = new Log();

        const target = await capitalRepo.findOne(capital.id);
        target.status = capital.status;
        target.reason = capital.reason;

        if (ProjectStatusEnum.CHECKED === target.status) {
            log.info = `${user.realname} 审核资金通过`;
        }

        if (ProjectStatusEnum.WAITING === target.status) {
            if (capital.org) {
                const org = await orgRepo.findOne(capital.org.id);
                target.org = capital.org;

                log.info = `${user.realname} 将资金分配给 "${org.title}"`;
            }
        }

        if (ProjectStatusEnum.FOLLOWING === target.status) {
            if (capital.own) {

                const own = await userRepo.findOne(capital.own.id);
                target.own = own;

                log.info = `${user.realname} 将资金分配给业务员 "${own.realname}"`;
            }

            if (target.reason) {
                log.info = `${user.realname} 跟进："${target.reason}"`;
            }
        }

        if (ProjectStatusEnum.REJECTED === target.status) {
            log.info = `${user.realname} 驳回资金，理由："${target.reason}"`;
        }

        if (ProjectStatusEnum.FINISHED === target.status) {
            log.info = `${user.realname} 完成资金`;
        }

        if (ProjectStatusEnum.CANCELLED === target.status) {
            log.info = `${user.realname} 作废资金，理由："${capital.reason}"`;
        }

        log.own = user;
        log.target = target.id;
        log.status = target.status;
        log.type = LogTypeEnum.CAPITAL;

        await logRepo.save(log);
        await capitalRepo.save(capital);

        return true;
    }
}
