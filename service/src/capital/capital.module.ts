import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Capital } from "../database";
import { WfModule } from "../wf";
import { CapitalController } from "./capital.controller";
import { CapitalResolver } from "./capital.resolver";
import { CapitalService } from "./capital.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Capital]),
        WfModule
    ],
    controllers: [CapitalController],
    providers: [
        CapitalService,
        CapitalResolver
    ]
})
export class CapitalModule { }