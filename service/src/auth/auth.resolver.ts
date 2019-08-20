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

    @Query(returns => User, { description: 'Fetch current user' })
    @UseGuards(GqlJwtAuthGuard)
    async me(@Me() me: User) {
        const result = await this.userService.findOne({
            where: { id: me.id },
            relations: [
                'org', 'area', 'providers', 'projects', 'capitals',
                'apply_products',
                'apply_projects',
                'apply_capitals',
                'apply_providers',
                'apply_products.applicant',
                'apply_products.product',
                'apply_projects.applicant',
                'apply_projects.project',
                'apply_providers.applicant',
                'apply_providers.provider',
                'apply_capitals.applicant',
                'apply_capitals.capital',
            ]
        });

        if (!result) throw new ApolloException('errors.invalid.auth', HttpStatus.UNAUTHORIZED);

        return result;
    }

    @Mutation(returns => Auth, { description: 'User login' })
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