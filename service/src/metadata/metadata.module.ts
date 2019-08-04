import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Metadata } from "../database";
import { MetadataController } from "./metadata.controller";
import { MetadataResolver } from "./metadata.resolver";
import { MetadataService } from "./metadata.service";

@Module({
    imports: [TypeOrmModule.forFeature([Metadata])],
    controllers: [MetadataController],
    providers: [MetadataService, MetadataResolver],
})
export class MetadataModule { }