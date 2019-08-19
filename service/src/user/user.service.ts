import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository, Transaction, TransactionRepository } from 'typeorm';
import { BaseService, UserLevelEnum } from '../core';
import { ApplyCapital, ApplyProduct, ApplyProject, ApplyProvider, Capital, Product, Project, Provider, User } from '../database/entities';
import { RegisterDto, ResetPasswordDto } from './dtos';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        @InjectRepository(User) protected readonly repo: Repository<User>
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


        await this.checkLimit(user.vip, 'capital');

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
            relations: ['apply_projects', 'apply_providers.project']
        });

        user.apply_projects.forEach(item => {
            if (item.project.id === parseInt(id)) {
                throw new BadRequestException('请勿重复申请');
            }
        });

        await this.checkLimit(user.vip, 'project');

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

    private async checkLimit(vip: UserLevelEnum, type: string) {
        if (UserLevelEnum.V0 === vip) {

        }

        if (UserLevelEnum.V1 <= vip) {

        }
    }
}
