import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import { LoggerMiddleware } from './common/logger';
import { CommonModule } from './common';
import { StorageModule } from './storage';
import { GqlModule } from './gql';


@Module({
  imports: [
    RenderModule,
    CommonModule,
    StorageModule,
    GqlModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}

