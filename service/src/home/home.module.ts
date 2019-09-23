import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SeoModule } from '../seo';
import { HomeController } from './home.controller';
import { SeoMiddleware } from './seo.middleware';

@Module({
  imports: [SeoModule],
  controllers: [
    HomeController,
  ],
})
export class HomeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SeoMiddleware)
      .forRoutes(
        HomeController
      );
  }
}
