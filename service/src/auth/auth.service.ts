import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { classToPlain } from 'class-transformer';
import { ApolloException } from '../core';
import { Logger } from '../logger';
import { User } from '../database/entities';
import { UserService } from '../user';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(account: string, password: string): Promise<User | null> {

        const user = await this.userService.findOneByAccount(account);

        if (!user) throw new ApolloException('user-login.login.result.account.notexist');

        const compareRes = await bcrypt.compare(password, user.password);

        if (!compareRes) throw new ApolloException('user-login.login.result.password.incorrect');

        return user;
    }

    async login(user: any) {
        const payload = { sub: 'user_token', ...classToPlain(user) };

        Logger.log('auth user:', user);
        Logger.log('auth payload:', payload);

        return {
            token: this.jwtService.sign(payload),
        };
    }
}