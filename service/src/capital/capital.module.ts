import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Capital } from "../database";
import { CapitalController } from "./capital.controller";
import { CapitalResolver } from "./capital.resolver";
import { CapitalService } from "./capital.service";

@Module({
    imports: [TypeOrmModule.forFeature([Capital])],
    controllers: [CapitalController],
    providers: [
        CapitalService,
        CapitalResolver
    ]
})
export class CapitalModule { }