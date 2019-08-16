import { HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApolloException, Headers, Me, IdentityEnum, ApplicationEnum } from '../core';
import { User } from '../database';
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
    async me(@Me() me: User) {
        const result = await this.userService.findOne({
            where: { id: me.id },
            relations: [
                'org', 'area', 'providers', 'projects', 'capitals',
                'apply_products', 'apply_projects', 'apply_capitals', 'apply_providers'
            ]
        });

        if (!result) throw new ApolloException('errors.invalid.auth', HttpStatus.UNAUTHORIZED);

        return result;
    }

    @Mutation(returns => Auth)
    async login(
        @Headers('application') application: string,
        @Args('loginData') loginData: LoginInput
    ) {
        const user = await this.authService.validateUser(loginData.account, loginData.password);

        if (application && ApplicationEnum.BACKSTAGE === application) {
            if (IdentityEnum.USER !== user.identity) throw new ApolloException('权限不足', HttpStatus.UNAUTHORIZED);
        }

        return await this.authService.login(user);
    }
}