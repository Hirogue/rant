import { Inject } from '@nestjs/common';
import { CONTEXT, Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { BasePaginate, BaseResolver } from '../core';
import { Role } from '../database';
import { RoleService } from './role.service';

@ObjectType()
export class RolePaginate extends BasePaginate(Role) { }

@Resolver(of => Role)
export class RoleResolver extends BaseResolver(Role, RolePaginate) {
    constructor(
        private readonly roleService: RoleService,
        @Inject(CONTEXT) context,
    ) {
        super(context, 'role');
    }

    @Query(returns => [Role]!)
    async roles() {
        return this.roleService.findAll();
    }

    @Mutation(returns => Boolean, {
        description: `Update role grants`
    })
    async updateGrants(@Args('id') id: string, @Args('data') data: Role) {
        return this.roleService.updateGrants(id, data.grants);
    }
}