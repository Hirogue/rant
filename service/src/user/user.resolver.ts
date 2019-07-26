import { Inject, UseGuards } from '@nestjs/common';
import { Args, CONTEXT, Query, Resolver } from '@nestjs/graphql';
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard';
import { BaseResolver, BaseQueryArgs } from '../core';
import { User } from '../database';
import { UserPaginated } from './user-paginated.type';
import { UserService } from './user.service';

const API_URL = 'user';

@Resolver(of => User)
@UseGuards(GqlJwtAuthGuard)
export class UserResolver extends BaseResolver {
    constructor(
        @Inject(CONTEXT) context,
        private readonly userService: UserService
    ) {
        super(context);
    }

    @Query(returns => UserPaginated)
    async users(@Args() args: BaseQueryArgs) {
        return await this.api.find(API_URL, args);
    }

    @Query(returns => User)
    async user(@Args('id') id: string) {

        return await this.api.findOne(API_URL, id);;
    }

    // @Query(returns => UserStatistics)
    // async userStatistics() {
    //     return await this.userService.statistics();
    // }

    // @Mutation(returns => Boolean)
    // async update(@Args('updateUserData') data: UpdateUserInput) {
    //     return await this.userService.update(data);
    // }
}