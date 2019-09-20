import { CacheModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as redisStore from 'cache-manager-redis-store';
import { AccessControlModule } from './access-control';
import { ApplyCapitalModule } from './apply-capital';
import { ApplyExpertModule } from './apply-expert';
import { ApplyProductModule } from './apply-product';
import { ApplyProjectModule } from './apply-project';
import { ApplyProviderModule } from './apply-provider';
import { ArticleModule } from './artilce';
import { AuthModule } from './auth';
import { CapitalModule } from './capital';
import { CarouselModule } from './carousel';
import { Config } from "./config";
import { BaseDataSource, CoreModule } from './core';
import { CustomerModule } from './customer';
import { DocumentModule } from './document';
import { ExpertModule } from './expert';
import { HomeModule } from './home';
import { LinkModule } from './link';
import { LogModule } from './log';
import { LoggerMiddleware, LoggerModule } from './logger';
import { MetadataModule } from './metadata';
import { OrgModule } from './org';
import { ProductModule } from './product';
import { ProjectModule } from './project';
import { ProviderModule } from './provider';
import { RenderModule } from './render';
import { RoleModule } from './role';
import { SeoModule } from './seo';
import { SpaController } from './spa.controller';
import { ModuleAccessStatisticsMiddleware, StatisticsModule } from './statistics';
import { StorageModule } from './storage';
import { SuccessCaseModule } from './success-case';
import { UserModule } from './user';
import { VerificationModule } from './verification';
import { WechatModule } from './wechat';

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
    AccessControlModule,
    StatisticsModule,
    RenderModule,
    LoggerModule,
    VerificationModule,
    LogModule,
    StorageModule,
    WechatModule,
    RoleModule,
    HomeModule,
    MetadataModule,
    OrgModule,
    UserModule,
    AuthModule,
    ArticleModule,
    ProviderModule,
    ProductModule,
    ProjectModule,
    CapitalModule,
    SuccessCaseModule,
    ExpertModule,
    CarouselModule,
    DocumentModule,
    SeoModule,
    LinkModule,
    CustomerModule,
    ApplyExpertModule,
    ApplyProductModule,
    ApplyProviderModule,
    ApplyProjectModule,
    ApplyCapitalModule
  ],
  controllers: [SpaController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*')
      .apply(ModuleAccessStatisticsMiddleware)
      .forRoutes({ path: '/api/*/*-*-*/', method: RequestMethod.GET });
  }
}

