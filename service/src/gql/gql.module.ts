import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Config } from "../config";
import { Todo, User } from "../database/entities";
import { AuthModule } from "./auth";
import { UserModule } from "./user";

@Module({
    imports: [
        TypeOrmModule.forRoot(Config.orm as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([User, Todo]),
        GraphQLModule.forRoot({
            ...Config.graphql,
            context: ({ req }) => ({ req }),
        }),
        UserModule,
        AuthModule,
    ]
})
export class GqlModule { }