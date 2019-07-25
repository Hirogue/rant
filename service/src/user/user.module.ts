import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../database";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { UserController } from "./user.controller";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, UserResolver],
    exports: [UserService]
})
export class UserModule { }