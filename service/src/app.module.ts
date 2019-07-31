import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { RenderModule } from 'nest-next';
import { AuthModule } from './auth';
import { Config } from "./config";
import { BaseDataSource, CoreModule } from './core';
import { HomeModule } from './home';
import { LoggerMiddleware, LoggerModule } from './logger';
import { OrgModule } from './org';
import { StorageModule } from './storage';
import { UserModule } from './user';

@Module({
  imports: [
    TypeOrmModule.forRoot(Config.orm as TypeOrmModuleOptions),
    GraphQLModule.forRoot({
      ...Config.graphql,
      context: ({ req }) => ({ req }),
      dataSources: () => ({ api: new BaseDataSource() })
    }),
    CoreModule,
    RenderModule,
    LoggerModule,
    StorageModule,
    HomeModule,
    OrgModule,
    UserModule,
    AuthModule,
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}

