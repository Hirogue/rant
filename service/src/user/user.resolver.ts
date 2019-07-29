import { Inject, UseGuards } from '@nestjs/common';
import { Args, CONTEXT, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard';
import { BaseResolver, BasePaginate } from '../core';
import { User } from '../database';
import { ObjectType } from 'type-graphql';

const API_URL = 'user';

@ObjectType()
export class UserPaginate extends BasePaginate(User) { }

@Resolver(of => User)
@UseGuards(GqlJwtAuthGuard)
export class UserResolver extends BaseResolver {

    constructor(@Inject(CONTEXT) context) { super(context); }

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

    @Mutation(returns => User)
    async createUser(@Args('data') data: User) {
        return await this.api.create(API_URL, data);
    }
}