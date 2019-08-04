import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { RenderModule } from 'nest-next';
import { AmountModule } from './amount';
import { SpaController } from './spa.controller';
import { AreaModule } from './area';
import { ArticleModule } from './artilce';
import { AuthModule } from './auth';
import { CapitalTypeModule } from './capital-type';
import { Config } from "./config";
import { BaseDataSource, CoreModule } from './core';
import { HomeModule } from './home';
import { IndustryModule } from './industry';
import { LoggerMiddleware, LoggerModule } from './logger';
import { OrgModule } from './org';
import { ProductModule } from './product';
import { ProviderModule } from './provider';
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
    AreaModule,
    AmountModule,
    CapitalTypeModule,
    IndustryModule,
    OrgModule,
    UserModule,
    AuthModule,
    ArticleModule,
    ProviderModule,
    ProductModule
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

