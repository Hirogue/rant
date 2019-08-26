import { Inject } from '@nestjs/common';
import { CONTEXT, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { BasePaginate, BaseResolver } from '../core';
import { Role } from '../database';

@ObjectType()
export class RolePaginate extends BasePaginate(Role) { }

@Resolver(of => Role)
export class RoleResolver extends BaseResolver(Role, RolePaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'role'); }
}