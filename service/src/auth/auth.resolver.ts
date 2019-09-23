import { HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  ApolloException,
  Headers,
  Me,
  IdentityEnum,
  ApplicationEnum,
} from '../core';
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
        'role',
        'org',
        'area',
      ],
    });

    if (!result)
      throw new ApolloException('身份验证失效', HttpStatus.UNAUTHORIZED);

    return result;
  }

  @Mutation(returns => Auth, { description: 'User login' })
  async login(
    @Headers('application') application: string,
    @Args('loginData') loginData: LoginInput,
  ) {
    const user = await this.authService.validateUser(
      loginData.account,
      loginData.password,
    );

    if (application && ApplicationEnum.BACKSTAGE === application) {
      if (IdentityEnum.USER !== user.identity)
        throw new ApolloException('权限不足', HttpStatus.UNAUTHORIZED);
    }

    return await this.authService.login(user);
  }
}
