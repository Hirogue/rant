import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerFormat, LoggerLevel, LoggerMiddleware, LoggerModule } from '@rant/logger';
import { transports } from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
