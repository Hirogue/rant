import { Inject, UseGuards } from '@nestjs/common';
import { Args, CONTEXT, Mutation, Resolver } from '@nestjs/graphql';
import { ObjectType, Int } from 'type-graphql';
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard';
import { BasePaginate, BaseResolver, Me } from '../core';
import { User } from '../database';
import { UserService } from './user.service';

@ObjectType()
export class UserPaginate extends BasePaginate(User) { }

@Resolver(of => User)
@UseGuards(GqlJwtAuthGuard)
export class UserResolver extends BaseResolver(User, UserPaginate) {
    constructor(
        @Inject(CONTEXT) context,
        private readonly userService: UserService
    ) { super(context, 'user'); }

    @Mutation(returns => Boolean)
    async applyProducts(@Args('id') id: string, @Me() me: User) {
        return await this.userService.applyProducts(id, me.id);
    }

    @Mutation(returns => Boolean)
    async applyCapitals(@Args('id') id: string, @Me() me: User) {
        return await this.userService.applyCapitals(id, me.id);
    }

    @Mutation(returns => Boolean)
    async applyProjects(@Args('id') id: string, @Me() me: User) {
        return await this.userService.applyProjects(id, me.id);
    }

    @Mutation(returns => Boolean)
    async applyProviders(@Args('id') id: string, @Me() me: User) {
        return await this.userService.applyProviders(id, me.id);
    }
}