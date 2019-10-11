import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@rant/config';
import { LoggerFormat, LoggerLevel, LoggerMiddleware, LoggerModule } from '@rant/logger';
import * as path from 'path';
import { transports } from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const ENV = process.env.NODE_ENV;
console.log(ENV)

@Module({
    imports: [
        ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'), {
            path: path.resolve(process.cwd(), !ENV ? '.env' : `.env.${ENV}`),
        }),
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
