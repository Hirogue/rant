import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RenderModule } from 'nest-next';
import { AppController } from './app.controller';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    RenderModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sql',
      logging: true,
      dropSchema: true,
      synchronize: true,
      entities: [resolve('./**/*.model.js')]
    }),
    CommonModule
  ],
  controllers: [AppController]
})
export class AppModule { }
