import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { RenderModule } from 'nest-next';
import { Config } from "./config";
import { LoggerMiddleware, LoggerModule } from './logger';
import { StorageModule } from './storage';
import { UserModule } from './user';
import { AuthModule } from './auth';
import { ProductModule } from './product';
import { ArticleModule } from './article';
import { CoreModule } from './core';

@Module({
  imports: [
    TypeOrmModule.forRoot(Config.orm as TypeOrmModuleOptions),
    GraphQLModule.forRoot({
      ...Config.graphql,
      context: ({ req }) => ({ req }),
    }),
    CoreModule,
    RenderModule,
    LoggerModule,
    StorageModule,
    UserModule,
    AuthModule,
    ProductModule,
    ArticleModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}

