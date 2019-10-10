import { Module } from '@nestjs/common';
import { LoggerLevel, LoggerFormat, LoggerModule } from '@rant/logger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { transports } from 'winston';

@Module({
    imports: [
        LoggerModule.forRoot({
            level: LoggerLevel.DEBUG,
            format: LoggerFormat.createFormat(),
            transports: [new transports.Console()]
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
