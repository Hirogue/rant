import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { BaseService } from '../core';
import { User } from '../database/entities';
import { RegisterDto, ResetPasswordDto } from './dtos';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    protected readonly repo: Repository<User>,
  ) {
    super(repo);
  }

  async findOneByAccount(account: string) {
    return await this.repo.findOne({ account });
  }

  async register(dto: RegisterDto) {
    const exist = await this.findOneByAccount(dto.phone);
    if (exist) throw new BadRequestException('该手机号已被注册');

    if (dto.password !== dto.confirmPassword)
      throw new BadRequestException('两次密码不一致');

    const user = new User();
    user.account = dto.phone;
    user.phone = dto.phone;
    user.password = dto.password;

    return await this.repo.save(user);
  }

  async resetPassword(dto: ResetPasswordDto) {
    if (dto.password !== dto.confirmPassword)
      throw new BadRequestException('两次密码不一致');

    return await this.changePassword(dto.phone, dto.password);
  }

  async changePassword(account: string, password: string) {
    const user = await this.findOneByAccount(account);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    return await this.repo.save(user);
  }
}