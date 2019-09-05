import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import * as moment from 'moment';
import { Repository, Transaction, TransactionRepository } from 'typeorm';
import { Config } from '../config';
import { BaseService, IdentityEnum, ProjectStatusEnum, UserLevelEnum, UserStatusEnum, LogTypeEnum } from '../core';
import { ApplyCapital, ApplyExpert, ApplyProduct, ApplyProject, ApplyProvider, Capital, Expert, Product, Project, Provider, User, Log, Org } from '../database/entities';
import { Logger } from '../logger';
import { LevelUpInput, RegisterDto, ResetPasswordDto } from './dtos';


@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        @InjectRepository(User)
        protected readonly repo: Repository<User>,
        @InjectRepository(ApplyProject)
        private readonly applyProjectRepository: Repository<ApplyProject>,
        @InjectRepository(ApplyCapital)
        private readonly applyCapitalRepository: Repository<ApplyCapital>,
    ) {
        super(repo);
    }

    @Transaction()
    async applyProducts(
        id: string, userId: string,
        @TransactionRepository(User) userRepo?: Repository<User>,
        @TransactionRepository(Product) productRepo?: Repository<Product>,
        @TransactionRepository(ApplyProduct) applyProductRepo?: Repository<ApplyProduct>,
    ) {
        const user = await userRepo.findOne({
            where: { id: userId },
            relations: ['apply_products', 'apply_products.product']
        });

        user.apply_products.forEach(item => {
            if (item.product.id === id) {
                throw new BadRequestException('请勿重复申请');
            }
        });

        const product = await productRepo.findOne({ id });

        const applyProduct = new ApplyProduct();
        applyProduct.product = product;
        applyProduct.applicant = user;
        await applyProductRepo.save(applyProduct);

        return true;
    }

    @Transaction()
    async applyCapitals(
        id: string, userId: string,
        @TransactionRepository(User) userRepo?: Repository<User>,
        @TransactionRepository(Capital) capitalRepo?: Repository<Capital>,
        @TransactionRepository(ApplyCapital) applyCapitalRepo?: Repository<ApplyCapital>,
    ) {
        const user = await userRepo.findOne({
            where: { id: userId },
            relations: ['apply_capitals', 'apply_capitals.capital']
        });

        user.apply_capitals.forEach(item => {
            if (item.capital.id === id) {
                throw new BadRequestException('请勿重复申请');
            }
        });

        await this.checkLimit(user, 'capital');

        const capital = await capitalRepo.findOne({ id });

        const applyCapital = new ApplyCapital();
        applyCapital.capital = capital;
        applyCapital.applicant = user;
        await applyCapitalRepo.save(applyCapital);

        return true;
    }

    @Transaction()
    async applyProjects(
        id: string, userId: string,
        @TransactionRepository(User) userRepo?: Repository<User>,
        @TransactionRepository(Project) projectRepo?: Repository<Project>,
        @TransactionRepository(ApplyProject) applyProjectRepo?: Repository<ApplyProject>,
    ) {
        const user = await userRepo.findOne({
            where: { id: userId },
            relations: ['apply_projects', 'apply_projects.project']
        });

        user.apply_projects.forEach(item => {
            if (item.project.id === id) {
                throw new BadRequestException('请勿重复申请');
            }
        });

        await this.checkLimit(user, 'project');

        const project = await projectRepo.findOne({ id });

        const applyProject = new ApplyProject();
        applyProject.project = project;
        applyProject.applicant = user;
        await applyProjectRepo.save(applyProject);

        return true;
    }

    @Transaction()
    async applyProviders(
        id: string, userId: string,
        @TransactionRepository(User) userRepo?: Repository<User>,
        @TransactionRepository(Provider) providerRepo?: Repository<Provider>,
        @TransactionRepository(ApplyProvider) applyProviderRepo?: Repository<ApplyProvider>,
    ) {
        const user = await userRepo.findOne({
            where: { id: userId },
            relations: ['apply_providers', 'apply_providers.provider']
        });

        user.apply_providers.forEach(item => {
            if (item.provider.id === id) {
                throw new BadRequestException('请勿重复申请');
            }
        });

        const provider = await providerRepo.findOne({ id });

        const applyProvider = new ApplyProvider();
        applyProvider.provider = provider;
        applyProvider.applicant = user;
        await applyProviderRepo.save(applyProvider);

        return true;
    }

    @Transaction()
    async applyExperts(
        id: string, userId: string,
        @TransactionRepository(User) userRepo?: Repository<User>,
        @TransactionRepository(Expert) expertRepo?: Repository<Expert>,
        @TransactionRepository(ApplyExpert) applyExpertRepo?: Repository<ApplyExpert>,
    ) {
        const user = await userRepo.findOne({
            where: { id: userId },
            relations: ['apply_experts', 'apply_experts.expert']
        });

        user.apply_experts.forEach(item => {
            if (item.expert.id === id) {
                throw new BadRequestException('请勿重复申请');
            }
        });

        const expert = await expertRepo.findOne({ id });

        const applyExpert = new ApplyExpert();
        applyExpert.expert = expert;
        applyExpert.applicant = user;
        await applyExpertRepo.save(applyExpert);

        return true;
    }

    async findOneByAccount(account: string) {
        return await this.repo.findOne({ account });
    }

    async register(dto: RegisterDto) {

        const exist = await this.findOneByAccount(dto.phone);
        if (exist) throw new BadRequestException('该手机号已被注册');

        if (dto.password !== dto.confirmPassword) throw new BadRequestException('两次密码不一致');

        const user = new User();
        user.account = dto.phone;
        user.phone = dto.phone;
        user.password = dto.password;

        return await this.repo.save(user);
    }

    async resetPassword(dto: ResetPasswordDto) {

        if (dto.password !== dto.confirmPassword) throw new BadRequestException('两次密码不一致');

        return await this.changePassword(dto.phone, dto.password);
    }

    async changePassword(account: string, password: string) {
        const user = await this.findOneByAccount(account);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        return await this.repo.save(user);
    }

    @Transaction()
    async levelUp(
        data: LevelUpInput,
        @TransactionRepository(User) userRepo?: Repository<User>,
        @TransactionRepository(Provider) providerRepo?: Repository<Provider>,
    ) {

        const user = data.user as User;
        user.status = UserStatusEnum.PENDING;

        await userRepo.save(user);

        if (IdentityEnum.PROVIDER === user.identity) {

            const provider = data.provider as Provider;
            provider.status = ProjectStatusEnum.PENDING;
            provider.creator = user;

            if (provider) {
                await providerRepo.save(provider);
            }

        }

        return true;
    }

    @Transaction()
    async approvalUser(
        data: User,
        user: User,
        @TransactionRepository(Log) logRepo?: Repository<Log>,
        @TransactionRepository(Org) orgRepo?: Repository<Org>,
        @TransactionRepository(User) userRepo?: Repository<User>,
        @TransactionRepository(Provider) providerRepo?: Repository<Provider>,
    ) {
        const log = new Log();

        const target = await userRepo.findOne({
            where: { id: data.id },
            relations: ['providers']
        });
        target.status = data.status;
        target.reason = data.reason;

        if (UserStatusEnum.PENDING === target.status) {
            if (data.org) {
                const org = await orgRepo.findOne(data.org.id);
                target.org = data.org;

                log.info = `${user.realname} 将用户分配给 "${org.title}"`;
            }

            if (data.own) {

                const own = await userRepo.findOne(data.own.id);
                target.own = own;

                log.info = `${user.realname} 将用户分配给业务员 "${own.realname}"`;
            }

            if (data.reason) {
                log.info = `${user.realname} 跟进："${data.reason}"`;
            }
        }

        if (UserStatusEnum.CHECKED === target.status) {
            log.info = `${user.realname} 审核通过，总结："${data.reason}"`;
            target.vip = UserLevelEnum.V1;

            if (IdentityEnum.PROVIDER === target.identity) {
                if (target.providers && target.providers.length > 0) {
                    const provider = target.providers[0];

                    if (!!provider) {
                        provider.status = ProjectStatusEnum.CHECKED;
                        provider.creator = target;

                        await providerRepo.save(provider);
                    }
                }
            }
        }

        if (UserStatusEnum.REJECTED === target.status) {
            log.info = `${user.realname} 驳回，理由："${data.reason}"`;
            target.vip = UserLevelEnum.V0;

            if (IdentityEnum.PROVIDER === target.identity) {
                if (target.providers && target.providers.length > 0) {
                    const provider = target.providers[0];

                    if (!!provider) {
                        provider.status = ProjectStatusEnum.REJECTED;
                        provider.reason = data.reason;
                        provider.creator = target;

                        await providerRepo.save(provider);
                    }
                }
            }
        }

        log.own = user;
        log.target = target.id;
        log.status = target.status.toString();
        log.type = LogTypeEnum.USER;

        await logRepo.save(log);
        await userRepo.save(target);

        return true;
    }

    private async checkLimit(user: User, type: string) {
        const currentDate = moment();
        const startOfDay = currentDate.startOf('day').format('YYYY-MM-DD HH:mm:ss');
        const endOfDay = currentDate.endOf('day').format('YYYY-MM-DD HH:mm:ss');

        let builder = null;
        let appliedyCount = -1;

        if ('project' === type) {
            builder = await this.applyProjectRepository.createQueryBuilder('t');
        } else {
            builder = await this.applyCapitalRepository.createQueryBuilder('t');
        }

        appliedyCount = await builder
            .leftJoin('t.applicant', 'applicant')
            .where('applicant.id = :id', { id: user.id })
            .andWhere('t.create_at BETWEEN :startOfDay AND :endOfDay', {
                startOfDay,
                endOfDay,
            })
            .printSql()
            .getCount();

        const total = UserLevelEnum.V0 <= user.vip
            ? Config.apply.v0Limit
            : Config.apply.v1Limit;

        Logger.log('total', total);
        Logger.log('appliedyCount', appliedyCount);

        if (total - appliedyCount <= 0) {
            throw new BadRequestException('今日可投递次数不足');
        }

    }
}
