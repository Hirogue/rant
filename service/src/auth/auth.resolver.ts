import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Me } from '../core';
import { User } from '../database';
import { Logger } from '../logger';
import { UserService } from '../user';
import { AuthService } from './auth.service';
import { Auth } from './auth.type';
import { GqlJwtAuthGuard } from './gql-jwt-auth.guard';
import { LoginInput } from './login.input';


@Resolver(of => Auth)
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }

    @Query(returns => User)
    @UseGuards(GqlJwtAuthGuard)
    async me(@Me() me) {
        return await this.userService.findOne(me.id);
    }

    @Mutation(returns => Auth)
    async login(
        @Args('loginData') loginData: LoginInput
    ) {
        const user = await this.authService.validateUser(loginData.account, loginData.password);

        return await this.authService.login(user);
    }
}