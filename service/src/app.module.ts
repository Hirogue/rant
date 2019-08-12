import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { RenderModule } from 'nest-next';
import { ArticleModule } from './artilce';
import { AuthModule } from './auth';
import { Config } from "./config";
import { BaseDataSource, CoreModule } from './core';
import { HomeModule } from './home';
import { LoggerMiddleware, LoggerModule } from './logger';
import { MetadataModule } from './metadata';
import { OrgModule } from './org';
import { ProductModule } from './product';
import { ProjectModule } from './project';
import { ProviderModule } from './provider';
import { SpaController } from './spa.controller';
import { StorageModule } from './storage';
import { UserModule } from './user';
import { VerificationModule } from './verification';

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
    VerificationModule,
    StorageModule,
    HomeModule,
    MetadataModule,
    OrgModule,
    UserModule,
    AuthModule,
    ArticleModule,
    ProviderModule,
    ProductModule,
    ProjectModule
  ],
  controllers: [SpaController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}

