import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../database";
import { TimeSeriesModule } from "../time-series";
import { StatisticsController } from "./statistics.controller";
import { StatisticsService } from "./statistics.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        TimeSeriesModule
    ],
    controllers: [StatisticsController],
    providers: [StatisticsService],
    exports: [StatisticsService]
})
export class StatisticsModule { }