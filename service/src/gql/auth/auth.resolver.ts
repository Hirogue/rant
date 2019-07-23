import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Logger } from '../../common/logger';
import { User } from '../../database';
import { AuthService } from './auth.service';
import { Auth } from './auth.type';
import { GqlJwtAuthGuard } from './gql-jwt-auth.guard';
import { LoginInput } from './login.input';
import { Me } from './me.decorator';
import { UsersService } from '../user';


@Resolver(of => Auth)
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) { }

    @Query(returns => User)
    @UseGuards(GqlJwtAuthGuard)
    async me(@Me() me) {
        Logger.log('current user', me);
        return await this.usersService.findOne(me.id);
    }

    @Mutation(returns => Auth)
    async login(
        @Args('loginData') loginData: LoginInput
    ) {
        const user = await this.authService.validateUser(loginData.account, loginData.password);

        return await this.authService.login(user);
    }
}