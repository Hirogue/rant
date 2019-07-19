import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";
import { Config } from "../../config";
import { Todo, User } from "../database/entities";
import { UsersService, TodoService } from "./services";
import { TodoResolver } from "./resolvers";

@Module({
    imports: [
        TypeOrmModule.forRoot(Config.orm as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([User, Todo]),
        GraphQLModule.forRoot({
            ...Config.graphql,
            context: ({ req }) => ({ req }),
        }),
    ],
    providers: [
        UsersService,
        TodoService,
        TodoResolver
    ],
    exports: [UsersService]
})
export class GqlModule { }