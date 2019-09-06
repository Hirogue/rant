import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplyCapital } from "../database";
import { ApplyCapitalController } from "./apply-capital.controller";
import { ApplyCapitalResolver } from "./apply-capital.resolver";
import { ApplyCapitalService } from "./apply-capital.service";

@Module({
    imports: [TypeOrmModule.forFeature([ApplyCapital])],
    controllers: [ApplyCapitalController],
    providers: [
        ApplyCapitalService,
        ApplyCapitalResolver
    ]
})
export class ApplyCapitalModule { }