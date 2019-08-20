import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplyCapital, ApplyProject, User } from "../database";
import { VerificationModule } from "../verification";
import { WfModule } from "../wf";
import { UserController } from "./user.controller";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, ApplyProject, ApplyCapital]),
        forwardRef(() => VerificationModule),
        WfModule
    ],
    controllers: [UserController],
    providers: [UserService, UserResolver],
    exports: [UserService]
})
export class UserModule { }