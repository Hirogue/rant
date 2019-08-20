import { CacheModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as redisStore from 'cache-manager-redis-store';
import { RenderModule } from 'nest-next';
import { ArticleModule } from './artilce';
import { AuthModule } from './auth';
import { CapitalModule } from './capital';
import { Config } from "./config";
import { BaseDataSource, CoreModule, HttpCacheInterceptor } from './core';
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
import { WfModule } from './wf';

@Module({
  imports: [
    TypeOrmModule.forRoot(Config.orm as TypeOrmModuleOptions),
    GraphQLModule.forRoot({
      ...Config.graphql,
      context: ({ req }) => ({ req }),
      dataSources: () => ({ api: new BaseDataSource() })
    }),
    CacheModule.register({
      store: redisStore,
      ...Config.redis,
      ...Config.cache
    }),
    CoreModule,
    RenderModule,
    LoggerModule,
    VerificationModule,
    WfModule,
    StorageModule,
    HomeModule,
    MetadataModule,
    OrgModule,
    UserModule,
    AuthModule,
    ArticleModule,
    ProviderModule,
    ProductModule,
    ProjectModule,
    CapitalModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
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

