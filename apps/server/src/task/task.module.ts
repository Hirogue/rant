import { Module } from '@nestjs/common';
import { SmsTask } from './sms.task';

@Module({
    providers: [SmsTask],
    exports: [SmsTask]
})
export class TaskModule {}
