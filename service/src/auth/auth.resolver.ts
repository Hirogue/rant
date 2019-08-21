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
                'org', 'area',

                'providers',

                'projects',
                'projects.creator',
                'projects.category',
                'projects.industry',
                'projects.area',

                'capitals',
                'capitals.creator',
                'capitals.industry',
                'capitals.stage',
                'capitals.type',

                'apply_providers',
                'apply_providers.provider',
                'apply_providers.provider.creator',
                'apply_providers.provider.category',
                'apply_providers.provider.area',

                'apply_products',
                'apply_products.product',
                'apply_products.product.category',

                'apply_projects',
                'apply_projects.project',
                'apply_projects.project.creator',

                'apply_capitals',
                'apply_capitals.capital',
                'apply_capitals.capital.creator',
                'apply_capitals.capital.industry',
                'apply_capitals.capital.stage',
                'apply_capitals.capital.type',
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