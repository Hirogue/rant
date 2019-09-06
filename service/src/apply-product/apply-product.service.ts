import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction, TransactionRepository } from 'typeorm';
import { BaseService, ProjectStatusEnum, LogTypeEnum } from '../core';
import { ApplyProduct, User, Org, Log } from '../database';

@Injectable()
export class ApplyProductService extends BaseService<ApplyProduct> {
    constructor(@InjectRepository(ApplyProduct) protected readonly repo: Repository<ApplyProduct>) {
        super(repo);
    }

    @Transaction()
    async approval(
        applyProduct: ApplyProduct,
        user: User,
        @TransactionRepository(Log) logRepo?: Repository<Log>,
        @TransactionRepository(Org) orgRepo?: Repository<Org>,
        @TransactionRepository(User) userRepo?: Repository<User>,
        @TransactionRepository(ApplyProduct) applyProductRepo?: Repository<ApplyProduct>,
    ) {
        const log = new Log();

        const target = await applyProductRepo.findOne(applyProduct.id);
        target.status = applyProduct.status;
        target.reason = applyProduct.reason;

        if (ProjectStatusEnum.CHECKED === target.status) {
            log.info = `${user.realname} 审核申请通过`;
        }

        if (ProjectStatusEnum.WAITING === target.status) {
            if (applyProduct.org) {
                const org = await orgRepo.findOne(applyProduct.org.id);
                target.org = applyProduct.org;

                log.info = `${user.realname} 将申请分配给 "${org.title}"`;
            }
        }

        if (ProjectStatusEnum.FOLLOWING === target.status) {
            if (applyProduct.own) {

                const own = await userRepo.findOne(applyProduct.own.id);
                target.own = own;

                log.info = `${user.realname} 将申请分配给业务员 "${own.realname}"`;
            }

            if (target.reason) {
                log.info = `${user.realname} 跟进："${target.reason}"`;
            }
        }

        if (ProjectStatusEnum.REJECTED === target.status) {
            log.info = `${user.realname} 驳回申请，理由："${target.reason}"`;
        }

        if (ProjectStatusEnum.FINISHED === target.status) {
            log.info = `${user.realname} 完成申请`;
        }

        if (ProjectStatusEnum.CANCELLED === target.status) {
            log.info = `${user.realname} 作废申请，理由："${applyProduct.reason}"`;
        }

        log.own = user;
        log.target = target.id;
        log.status = target.status;
        log.type = LogTypeEnum.PRODUCT;

        await logRepo.save(log);
        await applyProductRepo.save(applyProduct);

        return true;
    }
}
