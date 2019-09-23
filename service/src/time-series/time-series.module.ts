import { Module } from '@nestjs/common';
import { TimeSeriesService } from './time-series.service';

@Module({
  providers: [TimeSeriesService],
  exports: [TimeSeriesService],
})
export class TimeSeriesModule {}
