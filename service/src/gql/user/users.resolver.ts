import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../../database';
import { GqlJwtAuthGuard } from '../auth/gql-jwt-auth.guard';
import { UsersService } from './users.service';
import { UserPaginated } from './user-paginated.type';
import { UserStatistics } from './user-statistics.type';
import { UserPaginatedArgs } from './user-paginated.args';
import { UpdateUserInput } from './update-user.input';


@Resolver(of => User)
@UseGuards(GqlJwtAuthGuard)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Query(returns => UserPaginated)
    async users(@Args() args: UserPaginatedArgs) {
        return await this.usersService.query(args);
    }

    @Query(returns => UserStatistics)
    async userStatistics() {
        return await this.usersService.statistics();
    }

    @Mutation(returns => Boolean)
    async update(data: UpdateUserInput) {
        return await this.usersService.save();
    }
}