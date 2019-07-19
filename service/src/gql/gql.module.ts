import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Config } from "../../config";
import { Todo, User } from "../database/entities";
import { AuthResolver, TodoResolver } from "./resolvers";
import { TodoService, UsersService } from "./services";

@Module({
    imports: [
        TypeOrmModule.forRoot(Config.orm as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([User, Todo]),
        GraphQLModule.forRoot({
            ...Config.graphql,
            context: ({ req }) => ({ req }),
        })
    ],
    providers: [
        UsersService,
        TodoService,
        TodoResolver,
        AuthResolver
    ],
    exports: [UsersService]
})
export class GqlModule { }