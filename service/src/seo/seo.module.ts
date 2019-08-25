import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Seo } from "../database";
import { SeoController } from "./seo.controller";
import { SeoResolver } from "./seo.resolver";
import { SeoService } from "./seo.service";

@Module({
    imports: [TypeOrmModule.forFeature([Seo])],
    controllers: [SeoController],
    providers: [
        SeoService,
        SeoResolver
    ]
})
export class SeoModule { }