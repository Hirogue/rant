import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "../database";
import { AccessControlService } from "./access-control.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Role]),
    ],
    providers: [AccessControlService],
    exports: [AccessControlService]
})
export class AccessControlModule { }