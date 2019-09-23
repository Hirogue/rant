import { CacheModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import * as config from 'config';
import { AccessControlModule } from './access-control';
import { ArticleModule } from './artilce';
import { AuthModule } from './auth';
import { BaseDataSource, CoreModule } from './core';
import { HomeModule } from './home';
import { LoggerMiddleware, LoggerModule } from './logger';
import { MetadataModule } from './metadata';
import { OrgModule } from './org';
import { RenderModule } from './render';
import { RoleModule } from './role';
import { SpaController } from './spa.controller';
import { StorageModule } from './storage';
import { UserModule } from './user';
import { VerificationModule } from './verification';
import { WechatModule } from './wechat';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...config.get('orm') }),
    GraphQLModule.forRoot({
      ...config.get('graphql'),
      context: ({ req }) => ({ req }),
      dataSources: () => ({ api: new BaseDataSource() }),
    }),
    CacheModule.register({
      store: redisStore,
      ...config.get('redis'),
      ...config.get('cache'),
    }),
    CoreModule,
    AccessControlModule,
    RenderModule,
    LoggerModule,
    VerificationModule,
    StorageModule,
    RoleModule,
    HomeModule,
    MetadataModule,
    OrgModule,
    UserModule,
    AuthModule,
    ArticleModule,
  ],
  controllers: [SpaController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
