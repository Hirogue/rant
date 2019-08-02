import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Area } from "../database";
import { AreaController } from "./area.controller";
import { AreaService } from "./area.service";
import { AreaResolver } from "./area.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([Area])],
    controllers: [AreaController],
    providers: [AreaService, AreaResolver],
})
export class AreaModule { }