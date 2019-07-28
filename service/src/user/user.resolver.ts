import { Inject, UseGuards } from '@nestjs/common';
import { Args, CONTEXT, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard';
import { BaseResolver } from '../core';
import { User } from '../database';
import { UserPaginate } from './user.paginate.type';

const API_URL = 'user';

@Resolver(of => User)
@UseGuards(GqlJwtAuthGuard)
export class UserResolver extends BaseResolver {
    constructor(
        @Inject(CONTEXT) context
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

    @Mutation(returns => Boolean)
    async updateUser(@Args('id') id: string, @Args('data') data: User) {
        return !!await this.api.update(API_URL, id, data);
    }
}