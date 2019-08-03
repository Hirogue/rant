import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Industry } from "../database";
import { IndustryController } from "./industry.controller";
import { IndustryService } from "./industry.service";
import { IndustryResolver } from "./industry.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([Industry])],
    controllers: [IndustryController],
    providers: [IndustryService, IndustryResolver],
})
export class IndustryModule { }