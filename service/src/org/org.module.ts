import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Org } from '../database';
import { OrgController } from './org.controller';
import { OrgService } from './org.service';
import { OrgResolver } from './org.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Org])],
  controllers: [OrgController],
  providers: [OrgService, OrgResolver],
})
export class OrgModule {}
