import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import { AppController } from './app.controller';
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from './common/middlewares';
import { AuthModule } from './auth/auth.module';
import { GqlModule } from './gql/gql.module';

@Module({
  imports: [
    RenderModule,
    CommonModule,
    AuthModule,
    GqlModule
  ],
  controllers: [AppController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}

