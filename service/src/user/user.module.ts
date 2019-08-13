import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../database";
import { VerificationModule } from "../verification";
import { UserController } from "./user.controller";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => VerificationModule)
    ],
    controllers: [UserController],
    providers: [UserService, UserResolver],
    exports: [UserService]
})
export class UserModule { }