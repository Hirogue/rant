import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CapitalType } from "../database";
import { CapitalTypeController } from "./capital-type.controller";
import { CapitalTypeResolver } from "./capital-type.resolver";
import { CapitalTypeService } from "./capital-type.service";


@Module({
    imports: [TypeOrmModule.forFeature([CapitalType])],
    controllers: [CapitalTypeController],
    providers: [CapitalTypeService, CapitalTypeResolver],
})
export class CapitalTypeModule { }