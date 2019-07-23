import { ArgsType, Field, Int } from 'type-graphql';
import { BasePaginatedArgs } from '../core/base-paginated.args';
import { IdentityEnum, UserStatusEnum } from '../../common/core/enums';

@ArgsType()
export class UserPaginatedArgs extends BasePaginatedArgs {
    @Field({ nullable: true })
    identity: IdentityEnum;

    @Field(type => Int, { defaultValue: -1 })
    status: UserStatusEnum;
}