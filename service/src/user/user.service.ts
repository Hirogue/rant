import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core';
import { User } from '../database/entities';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(@InjectRepository(User) protected readonly repo: Repository<User>) {
        super(repo);
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
}
