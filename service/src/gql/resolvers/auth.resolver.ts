import { UseGuards, Req } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../../auth/auth.service';
import { Me } from '../../common/decorators';
import { GqlJwtAuthGuard } from '../../common/guards';
import { User } from '../../database/entities';
import { LoginInput } from '../dtos';
import { UsersService } from '../services';
import { Auth } from '../types';
import { Logger } from '../../libs';

@Resolver(of => Auth)
export class AuthResolver {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) { }

    @Query(returns => User)
    @UseGuards(new GqlJwtAuthGuard('jwt'))
    me(@Req() req, @Me() me) {
        Logger.log(req);
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