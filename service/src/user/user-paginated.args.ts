import { ArgsType, Field, Int } from 'type-graphql';
import { BasePaginatedArgs } from '../core';
import { IdentityEnum, UserStatusEnum } from '../core';

@ArgsType()
export class UserPaginatedArgs extends BasePaginatedArgs {
    @Field({ nullable: true })
    identity: IdentityEnum;

    @Field(type => Int, { defaultValue: -1 })
    status: UserStatusEnum;
}