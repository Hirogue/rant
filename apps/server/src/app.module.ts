import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@rant/config';
import { LoggerFormat, LoggerLevel, LoggerMiddleware, LoggerModule } from '@rant/logger';
import * as path from 'path';
import { transports } from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
        LoggerModule.forRoot({
            level: LoggerLevel.DEBUG,
            format: LoggerFormat.createFormat(),
            transports: [new transports.Console()]
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
