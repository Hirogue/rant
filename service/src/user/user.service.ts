import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import * as moment from 'moment';
import { Repository, Transaction, TransactionRepository } from 'typeorm';
import { Config } from '../config';
import { BaseService, UserLevelEnum } from '../core';
import { ApplyCapital, ApplyProduct, ApplyProject, ApplyProvider, Capital, Product, Project, Provider, User } from '../database/entities';
import { Logger } from '../logger';
import { WfService } from '../wf';
import { AdminApprovalInput, LevelUpInput, RegisterDto, ResetPasswordDto } from './dtos';
import { FlowId } from './flows';
import { EventEnum } from './flows/event.enum';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        private readonly wf: WfService,
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
        id: string, userId: number,
        @TransactionRepository(User) userRepo?: Repository<User>,
        @TransactionRepository(Product) productRepo?: Repository<Product>,
        @TransactionRepository(ApplyProduct) applyProductRepo?: Repository<ApplyProduct>,
    ) {
        const user = await userRepo.findOne({
            where: { id: userId },
            relations: ['apply_products', 'apply_products.product']
        });

        user.apply_products.forEach(item => {
            if (item.product.id === parseInt(id)) {
                throw new BadRequestException('请勿重复申请');
            }
        });

        const product = await productRepo.findOne({ id: parseInt(id) });

        const applyProduct = new ApplyProduct();
        applyProduct.product = product;
        applyProduct.applicant = user;
        await applyProductRepo.save(applyProduct);

        return true;
    }

    @Transaction()
    async applyCapitals(
        id: string, userId: number,
        @TransactionRepository(User) userRepo?: Repository<User>,
        @TransactionRepository(Capital) capitalRepo?: Repository<Capital>,
        @TransactionRepository(ApplyCapital) applyCapitalRepo?: Repository<ApplyCapital>,
    ) {
        const user = await userRepo.findOne({
            where: { id: userId },
            relations: ['apply_capitals', 'apply_capitals.capital']
        });

        user.apply_capitals.forEach(item => {
            if (item.capital.id === parseInt(id)) {
                throw new BadRequestException('请勿重复申请');
            }
        });

        await this.checkLimit(user, 'capital');

        const capital = await capitalRepo.findOne({ id: parseInt(id) });

        const applyCapital = new ApplyCapital();
        applyCapital.capital = capital;
        applyCapital.applicant = user;
        await applyCapitalRepo.save(applyCapital);

        return true;
    }

    @Transaction()
    async applyProjects(
        id: string, userId: number,
        @TransactionRepository(User) userRepo?: Repository<User>,
        @TransactionRepository(Project) projectRepo?: Repository<Project>,
        @TransactionRepository(ApplyProject) applyProjectRepo?: Repository<ApplyProject>,
    ) {
        const user = await userRepo.findOne({
            where: { id: userId },
            relations: ['apply_projects', 'apply_projects.project']
        });

        user.apply_projects.forEach(item => {
            if (item.project.id === parseInt(id)) {
                throw new BadRequestException('请勿重复申请');
            }
        });

        await this.checkLimit(user, 'project');

        const project = await projectRepo.findOne({ id: parseInt(id) });

        const applyProject = new ApplyProject();
        applyProject.project = project;
        applyProject.applicant = user;
        await applyProjectRepo.save(applyProject);

        return true;
    }

    @Transaction()
    async applyProviders(
        id: string, userId: number,
        @TransactionRepository(User) userRepo?: Repository<User>,
        @TransactionRepository(Provider) providerRepo?: Repository<Provider>,
        @TransactionRepository(ApplyProvider) applyProviderRepo?: Repository<ApplyProvider>,
    ) {
        const user = await userRepo.findOne({
            where: { id: userId },
            relations: ['apply_providers', 'apply_providers.provider']
        });

        user.apply_providers.forEach(item => {
            if (item.provider.id === parseInt(id)) {
                throw new BadRequestException('请勿重复申请');
            }
        });

        const provider = await providerRepo.findOne({ id: parseInt(id) });

        const applyProvider = new ApplyProvider();
        applyProvider.provider = provider;
        applyProvider.applicant = user;
        await applyProviderRepo.save(applyProvider);

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

        const user = await this.findOneByAccount(dto.phone);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(dto.password, salt);

        return await this.repo.save(user);
    }

    async levelUp(data: LevelUpInput) {

        await this.wf.start(FlowId, data);
        return true;
    }

    async adminApproval(data: AdminApprovalInput) {

        await this.wf.publish(
            EventEnum.APPROVAL,
            `${EventEnum.APPROVAL}-${data.user.id}`,
            data
        );
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
