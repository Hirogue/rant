import { BadRequestException, Injectable, HttpException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository, Transaction, TransactionRepository } from 'typeorm';
import { BaseService } from '../core';
import { User, Capital, Project, Provider } from '../database/entities';
import { RegisterDto, ResetPasswordDto } from './dtos';
import { UserLevelEnum } from 'dist/src/core';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        @InjectRepository(User) protected readonly repo: Repository<User>
    ) {
        super(repo);
    }

    @Transaction()
    async applyCapitals(
        id: string, userId: number,
        @TransactionRepository(User) userRepo?: Repository<User>,
        @TransactionRepository(Capital) capitalRepo?: Repository<Capital>,
    ) {
        const user = await userRepo.findOne({
            where: { id: userId },
            relations: ['apply_capitals']
        });

        if (UserLevelEnum.V1 > user.vip) {
            throw new UnauthorizedException('请先升级VIP等级');
        }

        const capital = await capitalRepo.findOne({ id: parseInt(id) });

        user.apply_capitals.push(capital);

        await userRepo.save(user);

        return true;
    }

    @Transaction()
    async applyProjects(
        id: string, userId: number,
        @TransactionRepository(User) userRepo?: Repository<User>,
        @TransactionRepository(Project) projectRepo?: Repository<Project>,
    ) {
        const user = await userRepo.findOne({
            where: { id: userId },
            relations: ['apply_projects']
        });

        if (UserLevelEnum.V1 > user.vip) {
            throw new UnauthorizedException('请先升级VIP等级');
        }

        const project = await projectRepo.findOne({ id: parseInt(id) });

        user.apply_projects.push(project);

        await userRepo.save(user);

        return true;
    }

    @Transaction()
    async applyProviders(
        id: string, userId: number,
        @TransactionRepository(User) userRepo?: Repository<User>,
        @TransactionRepository(Provider) providerRepo?: Repository<Provider>,
    ) {
        const user = await userRepo.findOne({
            where: { id: userId },
            relations: ['apply_providers']
        });

        if (UserLevelEnum.V1 > user.vip) {
            throw new UnauthorizedException('请先升级VIP等级');
        }

        const provider = await providerRepo.findOne({ id: parseInt(id) });

        user.apply_providers.push(provider);

        await userRepo.save(user);

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
}
