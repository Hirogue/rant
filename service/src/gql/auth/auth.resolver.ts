import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Logger } from '../../common/logger';
import { User } from '../../database';
import { AuthService } from './auth.service';
import { Auth } from './auth.type';
import { GqlJwtAuthGuard } from './gql-jwt-auth.guard';
import { LoginInput } from './login.input';
import { Me } from './me.decorator';


@Resolver(of => Auth)
export class AuthResolver {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Query(returns => User)
    @UseGuards(GqlJwtAuthGuard)
    me(@Me() me) {
        Logger.log(me)
        return me;
    }

    @Mutation(returns => Auth)
    async login(
        @Args('loginData') loginData: LoginInput
    ) {
        const user = await this.authService.validateUser(loginData.account, loginData.password);

        return await this.authService.login(user);
    }
}