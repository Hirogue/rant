import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../../database';
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard';
import { UserService } from './user.service';
import { UserPaginated } from './user-paginated.type';
import { UserStatistics } from './user-statistics.type';
import { UserPaginatedArgs } from './user-paginated.args';
import { UpdateUserInput } from './update-user.input';


@Resolver(of => User)
@UseGuards(GqlJwtAuthGuard)
export class UserResolver {
    constructor(
        private readonly userService: UserService
    ) { }

    @Query(returns => UserPaginated)
    async users(@Args() args: UserPaginatedArgs) {
        return await this.userService.query(args);
    }

    @Query(returns => UserStatistics)
    async userStatistics() {
        return await this.userService.statistics();
    }

    @Mutation(returns => Boolean)
    async update(@Args('updateUserData') data: UpdateUserInput) {
        return await this.userService.update(data);
    }
}