import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccessControlModule } from "../access-control";
import { Role } from "../database";
import { RoleController } from "./role.controller";
import { RoleResolver } from "./role.resolver";
import { RoleService } from "./role.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Role]),
        AccessControlModule,
    ],
    controllers: [RoleController],
    providers: [
        RoleService,
        RoleResolver
    ]
})
export class RoleModule { }