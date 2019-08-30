import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Log } from "../database";
import { LogController } from "./log.controller";
import { LogResolver } from "./log.resolver";
import { LogService } from "./log.service";

@Module({
    imports: [TypeOrmModule.forFeature([Log])],
    controllers: [LogController],
    providers: [
        LogService,
        LogResolver
    ]
})
export class LogModule { }