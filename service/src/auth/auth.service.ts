import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { classToPlain } from 'class-transformer';
import { User } from '../database/entities';
import { UsersService } from '../gql/services/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(account: string, password: string): Promise<User | null> {

        const user = await this.usersService.findOneByAccount(account);
        if (user) {
            const compareRes = await bcrypt.compare(password, user.password);
            return compareRes ? user : null;
        }
        return null;
    }

    async login(user: any) {
        const payload = { sub: 'user_token', ...classToPlain(user) };
        return {
            token: this.jwtService.sign(payload),
        };
    }
}