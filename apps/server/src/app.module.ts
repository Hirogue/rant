import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@rant/config';
import { LoggerMiddleware, LoggerModule } from '@rant/logger';
import { QueueModule } from '@rant/queue';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task';

@Module({
    imports: [
        ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
        LoggerModule.registerAsync({
            useFactory: async (config: ConfigService) => config.get('logger'),
            inject: [ConfigService]
        }),
        QueueModule.registerAsync({
            useFactory: async (config: ConfigService) => config.get('queue'),
            inject: [ConfigService]
        }),
        TaskModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
