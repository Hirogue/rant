import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { classToPlain } from 'class-transformer';
import * as crypto from 'crypto';
import { ApolloException } from '../core';
import { User } from '../database/entities';
import { UserService } from '../user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(account: string, password: string): Promise<User | null> {
    const user = await this.userService.findOne({
      where: { account },
      relations: ['role', 'org'],
    });

    if (!user) throw new ApolloException('账户不存在');

    const compareRes = await bcrypt.compare(password, user.password);

    if (!compareRes) {
      if (
        user.lastPassword ===
        crypto
          .createHash('md5')
          .update(password)
          .digest('hex')
      ) {
        return await this.userService.changePassword(user.account, password);
      }

      throw new ApolloException('密码错误');
    }

    return user;
  }

  async login(user: any) {
    const payload = { sub: 'user_token', ...classToPlain(user) };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
