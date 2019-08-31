import { Module } from "@nestjs/common";
import { StatisticsService } from "./statistics.service";
import { TimeSeriesModule } from "../time-series";

@Module({
    imports: [TimeSeriesModule],
    providers: [StatisticsService],
    exports: [StatisticsService]
})
export class StatisticsModule { }