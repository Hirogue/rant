import { Inject, UseGuards } from '@nestjs/common';
import { CONTEXT, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard';
import { BasePaginate, BaseResolver } from '../core';
import { User } from '../database';
import { UserService } from './user.service';

@ObjectType()
export class UserPaginate extends BasePaginate(User) { }

@Resolver(of => User)
@UseGuards(GqlJwtAuthGuard)
export class UserResolver extends BaseResolver(User, UserPaginate) {
  constructor(
    @Inject(CONTEXT) context,
    private readonly userService: UserService,
  ) {
    super(context, 'user');
  }
}
