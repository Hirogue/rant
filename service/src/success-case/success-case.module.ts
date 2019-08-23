import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuccessCase } from "../database";
import { SuccessCaseController } from "./success-case.controller";
import { SuccessCaseResolver } from "./success-case.resolver";
import { SuccessCaseService } from "./success-case.service";

@Module({
    imports: [TypeOrmModule.forFeature([SuccessCase])],
    controllers: [SuccessCaseController],
    providers: [
        SuccessCaseService,
        SuccessCaseResolver
    ]
})
export class SuccessCaseModule { }