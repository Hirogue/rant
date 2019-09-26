import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction, TransactionRepository } from 'typeorm';
import { BaseService, ProjectStatusEnum, SmsTypeEnum, UserTypeEnum } from '../core';
import { Customer, User } from '../database';
import { VerificationService } from '../verification';

@Injectable()
export class CustomerService extends BaseService<Customer> {

    constructor(
        @InjectRepository(Customer)
        protected readonly repo: Repository<Customer>,
        protected readonly verificationService: VerificationService,
    ) {
        super(repo);
    }


    @Transaction()
    async approval(
        customer: Customer,
        @TransactionRepository(User) userRepo?: Repository<User>,
        @TransactionRepository(Customer) customerRepo?: Repository<Customer>,
    ) {
        const target = await customerRepo.findOne(customer.id);
        target.status = customer.status;

        if (ProjectStatusEnum.CHECKED === target.status) {

            // 注册新用户
            const exist = await userRepo.findOne({
                where: { account: target.phone }
            });

            if (!exist) {
                const user = new User();
                user.account = target.phone;
                user.phone = target.phone;
                user.realname = target.realname;
                user.company = target.company;
                user.area = target.area;
                user.type = UserTypeEnum.ENTERPRISE;

                await userRepo.save(user);
            }

            await this.verificationService.sendSms(target.phone, SmsTypeEnum.CUSTOMER);
        }

        await customerRepo.save(target);
        return true;
    }

    async importData(data: any) {
        return true;
    }
}
