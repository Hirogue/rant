import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import { LoggerMiddleware } from './common/logger';
import { CommonModule } from './common';
import { GqlModule } from './gql';

@Module({
  imports: [
    RenderModule,
    CommonModule,
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

