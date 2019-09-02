import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Metadata } from "../database";
import { MetadataController } from "./metadata.controller";
import { MetadataResolver } from "./metadata.resolver";
import { MetadataService } from "./metadata.service";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { HttpCacheInterceptor } from "../core";

@Module({
    imports: [TypeOrmModule.forFeature([Metadata])],
    controllers: [MetadataController],
    providers: [
        // {
        //     provide: APP_INTERCEPTOR,
        //     useClass: HttpCacheInterceptor,
        // },
        MetadataService,
        MetadataResolver
    ],
})
export class MetadataModule { }