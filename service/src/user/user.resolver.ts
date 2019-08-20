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

    @Mutation(returns => Boolean, { description: 'Apply product' })
    async applyProducts(@Args('id') id: string, @Me() me: User) {
        return await this.userService.applyProducts(id, me.id);
    }

    @Mutation(returns => Boolean, { description: 'Apply capital' })
    async applyCapitals(@Args('id') id: string, @Me() me: User) {
        return await this.userService.applyCapitals(id, me.id);
    }

    @Mutation(returns => Boolean, { description: 'Apply project' })
    async applyProjects(@Args('id') id: string, @Me() me: User) {
        return await this.userService.applyProjects(id, me.id);
    }

    @Mutation(returns => Boolean, { description: 'Apply provider' })
    async applyProviders(@Args('id') id: string, @Me() me: User) {
        return await this.userService.applyProviders(id, me.id);
    }
}