import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { classToPlain } from 'class-transformer';
import { ApolloException } from '../core';
import { User } from '../database/entities';
import { UserService } from '../user';
import { ResetPasswordDto } from 'src/user/dtos';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(account: string, password: string): Promise<User | null> {

        const user = await this.userService.findOne({ account });

        if (!user) throw new ApolloException('user-login.login.result.account.notexist');

        const compareRes = await bcrypt.compare(password, user.password);

        if (!compareRes) {

            if (user.lastPassword === crypto.createHash('md5').update(password).digest('hex')) {
                return await this.userService.changePassword(user.account, password);
            }

            throw new ApolloException('user-login.login.result.password.incorrect');
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