import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../database";
import { UsersService } from "./users.service";
import { UsersResolver } from "./users.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, UsersResolver],
    exports: [UsersService]
})
export class UserModule { }