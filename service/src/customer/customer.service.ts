import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction, TransactionRepository } from 'typeorm';
import { BaseService, ProjectStatusEnum, SmsTypeEnum, UserTypeEnum } from '../core';
import { Customer, User, Metadata } from '../database';
import { VerificationService } from '../verification';

@Injectable()
export class CustomerService extends BaseService<Customer> {

    constructor(
        @InjectRepository(Customer)
        protected readonly repo: Repository<Customer>,
        @InjectRepository(Metadata)
        protected readonly metadataRepo: Repository<Metadata>,
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
        const target = await customerRepo.findOne({
            where: { id: customer.id },
            relations: ['area']
        });
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

        const list = [];

        for (let item of data) {

            const customer = new Customer();
            customer.realname = item['联系人'];
            customer.phone = item['手机号'];
            customer.org_type = item['机构类别'];
            customer.company = item['企业全称'];
            customer.source = '2019投融资促进会';

            if (!item['地区']) throw new BadRequestException('参数[地区]缺失');
            const areaList = item['地区'].split(' ');

            let area = null;

            const root = await this.metadataRepo.findOne({ where: { title: '地区' } });

            for (let i = 0; i < areaList.length; i++) {
                const builder = this.metadataRepo.createQueryBuilder('t');

                builder
                    .leftJoinAndSelect('t.parent', 'parent')
                    .where('t.title = :title', { title: areaList[i] })
                    .andWhere('parent.id = :pid', { pid: !area ? root.id : area.id });

                area = await builder.getOne();
            }

            customer.area = area;

            const participants = [];

            if (item['参会人1姓名']) {
                participants.push({ realname: item['参会人1姓名'], phone: item['参会人1电话'] })
            }

            if (item['参会人2姓名']) {
                participants.push({ realname: item['参会人2姓名'], phone: item['参会人2电话'] })
            }

            const board_and_lodging = [];

            if (item['5日晚餐']) {
                board_and_lodging.push('dinner5');
            }

            if (item['5日住宿（含早餐）']) {
                board_and_lodging.push('stay5');
            }

            if (item['6日午餐']) {
                board_and_lodging.push('lunch6');
            }

            customer.ex_info = {
                board_and_lodging,
                participants
            };

            list.push(customer);
        }

        return await this.repo.save(list);
    }
}
