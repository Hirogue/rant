import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import * as moment from 'moment';
import { Repository, Transaction, TransactionRepository } from 'typeorm';
import { Config } from '../config';
import { BaseService, IdentityEnum, LogTypeEnum, ProjectStatusEnum, UserLevelEnum, UserStatusEnum } from '../core';
import { ApplyCapital, ApplyExpert, ApplyProduct, ApplyProject, ApplyProvider, Capital, Expert, Log, Org, Product, Project, Provider, User } from '../database/entities';
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
        id: string, user: User,
        @TransactionRepository(Product) productRepo?: Repository<Product>,
        @TransactionRepository(ApplyProduct) applyProductRepo?: Repository<ApplyProduct>,
    ) {

        const applyCount = await applyProductRepo.createQueryBuilder('t')
            .leftJoin('t.product', 'product')
            .leftJoin('t.applicant', 'applicant')
            .where('product.id = :product', { product: id })
            .andWhere('applicant.id = :applicant', { applicant: user.id })
            .getCount();

        if (applyCount > 0) {
            throw new BadRequestException('请勿重复申请');
        }

        const product = await productRepo.findOne({ id });

        const applyProduct = new ApplyProduct();
        applyProduct.product = product;
        applyProduct.applicant = user;
        await applyProductRepo.save(applyProduct);

        return true;
    }

    @Transaction()
    async applyCapitals(
        id: string, user: User,
        @TransactionRepository(Capital) capitalRepo?: Repository<Capital>,
        @TransactionRepository(ApplyCapital) applyCapitalRepo?: Repository<ApplyCapital>,
    ) {

        const applyCount = await applyCapitalRepo.createQueryBuilder('t')
            .leftJoin('t.capital', 'capital')
            .leftJoin('t.applicant', 'applicant')
            .where('capital.id = :capital', { capital: id })
            .andWhere('applicant.id = :applicant', { applicant: user.id })
            .getCount();

        if (applyCount > 0) {
            throw new BadRequestException('请勿重复申请');
        }

        const capital = await capitalRepo.findOne({
            relations: ['creator'],
            where: { id }
        });

        await this.checkLimit(user, capital);

        const applyCapital = new ApplyCapital();
        applyCapital.capital = capital;
        applyCapital.applicant = user;
        await applyCapitalRepo.save(applyCapital);

        return true;
    }

    @Transaction()
    async applyProjects(
        id: string, user: User,
        @TransactionRepository(Project) projectRepo?: Repository<Project>,
        @TransactionRepository(ApplyProject) applyProjectRepo?: Repository<ApplyProject>,
    ) {
        const applyCount = await applyProjectRepo.createQueryBuilder('t')
            .leftJoin('t.project', 'project')
            .leftJoin('t.applicant', 'applicant')
            .where('project.id = :project', { project: id })
            .andWhere('applicant.id = :applicant', { applicant: user.id })
            .getCount();

        if (applyCount > 0) {
            throw new BadRequestException('请勿重复申请');
        }

        const project = await projectRepo.findOne({
            relations: ['creator'],
            where: { id }
        });

        await this.checkLimit(user, project);

        const applyProject = new ApplyProject();
        applyProject.project = project;
        applyProject.applicant = user;
        await applyProjectRepo.save(applyProject);

        return true;
    }

    @Transaction()
    async applyProviders(
        id: string, user: User,
        @TransactionRepository(Provider) providerRepo?: Repository<Provider>,
        @TransactionRepository(ApplyProvider) applyProviderRepo?: Repository<ApplyProvider>,
    ) {
        const applyCount = await applyProviderRepo.createQueryBuilder('t')
            .leftJoin('t.provider', 'provider')
            .leftJoin('t.applicant', 'applicant')
            .where('provider.id = :provider', { provider: id })
            .andWhere('applicant.id = :applicant', { applicant: user.id })
            .getCount();

        if (applyCount) {
            throw new BadRequestException('请勿重复申请');
        }

        const provider = await providerRepo.findOne({
            relations: ['creator'],
            where: { id }
        });

        const applyProvider = new ApplyProvider();
        applyProvider.provider = provider;
        applyProvider.applicant = user;
        await applyProviderRepo.save(applyProvider);

        return true;
    }

    @Transaction()
    async applyExperts(
        id: string, user: User,
        @TransactionRepository(Expert) expertRepo?: Repository<Expert>,
        @TransactionRepository(ApplyExpert) applyExpertRepo?: Repository<ApplyExpert>,
    ) {
        const applyCount = await applyExpertRepo.createQueryBuilder('t')
            .leftJoin('t.expert', 'expert')
            .leftJoin('t.applicant', 'applicant')
            .where('expert.id = :expert', { expert: id })
            .andWhere('applicant.id = :applicant', { applicant: user.id })
            .getCount();

        if (applyCount > 0) {
            throw new BadRequestException('请勿重复申请');
        }

        const expert = await expertRepo.findOne({
            relations: ['creator'],
            where: { id }
        });

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

                        await providerRepo.save(provider);
                    }
                }
            }
        }

        if (UserStatusEnum.REJECTED === target.status) {
            log.info = `${user.realname} 驳回，理由："${data.reason}"`;
            target.vip = UserLevelEnum.V0;

            if (IdentityEnum.PROVIDER === target.identity) {
                if (target.providers && target.providers.length > 0) {
                    const provider = target.providers[0];

                    if (!!provider) {
                        provider.status = ProjectStatusEnum.REJECTED;
                        provider.reason = data.reason;

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

    private async checkLimit(user: User, target: Capital | Project) {

        if (target.creator.id === user.id) {
            throw new BadRequestException('不可投递自己发布项目或资金');
        }

        const count = await this.remainderApplyCount(user.id);

        if (count <= 0) {
            throw new BadRequestException('今日可投递次数不足');
        }

    }

    async remainderApplyCount(id: string) {
        const currentDate = moment();
        const startOfDay = currentDate.startOf('day').format('YYYY-MM-DD HH:mm:ss');
        const endOfDay = currentDate.endOf('day').format('YYYY-MM-DD HH:mm:ss');

        const projectCount = await this.applyProjectRepository
            .createQueryBuilder('t')
            .leftJoin('t.applicant', 'applicant')
            .where('applicant.id = :id', { id })
            .andWhere('t.create_at BETWEEN :startOfDay AND :endOfDay', {
                startOfDay,
                endOfDay,
            })
            .getCount();

        const capitalCount = await this.applyCapitalRepository
            .createQueryBuilder('t')
            .leftJoin('t.applicant', 'applicant')
            .where('applicant.id = :id', { id })
            .andWhere('t.create_at BETWEEN :startOfDay AND :endOfDay', {
                startOfDay,
                endOfDay,
            })
            .getCount();

        const user = await this.repo.findOne(id);

        const total = user.vip <= UserLevelEnum.V0
            ? Config.apply.v0Limit
            : Config.apply.v1Limit;

        return total - (projectCount + capitalCount);
    }
}
