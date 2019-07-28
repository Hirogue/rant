import { Inject, UseGuards } from '@nestjs/common';
import { Args, CONTEXT, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard';
import { BaseResolver } from '../core';
import { User } from '../database';
import { UserPaginate } from './dtos';
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

    @Query(returns => UserPaginate)
    async users(@Args('queryString') queryString: string) {
        return await this.api.find(API_URL, queryString);
    }

    @Query(returns => User)
    async user(@Args('id') id: string, @Args('queryString') queryString: string) {
        return await this.api.findOne(API_URL, id, queryString);
    }

    @Mutation(returns => Boolean)
    async deleteUser(@Args('ids') ids: string) {
        return !!await this.api.remove(API_URL, ids);
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